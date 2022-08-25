import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import * as Sinon from "sinon";
import { app } from "../app";
import User from "../database/models/User";
import * as mock from "./mocks/login.mock";

chai.use(chaiHttp);

describe("Testes de integração - Seção 1: Users e Login", () => {
  describe("Login", () => {
    beforeEach(() => {
      Sinon.stub(User, "findOne").resolves(mock.loginResolves as User);
    });

    afterEach(() => {
      Sinon.restore();
    });

    it("endpoint /login deve retornar status 200 e um token", async () => {
      const response = await chai
        .request(app)
        .post("/login")
        .send(mock.loginSend);

      chai.expect(response.status).to.be.equal(200);
      chai.expect(response.body).contains.keys("token");
    });
  });
});
