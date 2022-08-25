import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import * as Sinon from "sinon";
import { app } from "../app";
import User from "../database/models/User";
import * as mock from "./mocks/login.mock";

chai.use(chaiHttp);

describe("Testes de integração - Seção 1: Users e Login", () => {
  describe("endpoint /login", () => {
    beforeEach(() => {
      Sinon.stub(User, "findOne").resolves(mock.loginResolves as User);
    });

    afterEach(() => {
      Sinon.restore();
    });

    it("Deve retornar status 200 e um token ao enviar dados válidos", async () => {
      const response = await chai
        .request(app)
        .post("/login")
        .send(mock.loginSend);

      chai.expect(response.status).to.be.equal(200);
      chai.expect(response.body).contains.keys("token");
    });

    it("Deve retornar status 400 e uma mensagem de erro sem o campo email", async () => {
      const response = await chai
        .request(app)
        .post("/login")
        .send(mock.loginWithoutEmail);

      chai.expect(response.status).to.be.equal(400);
      chai
        .expect(response.body)
        .to.have.property("message", "All fields must be filled");
    });

    it("Deve retornar status 400 e uma mensagem de erro sem o campo password", async () => {
      const response = await chai
        .request(app)
        .post("/login")
        .send(mock.loginWithoutPassword);

      chai.expect(response.status).to.be.equal(400);
      chai
        .expect(response.body)
        .to.have.property("message", "All fields must be filled");
    });

    it("Deve retornar status 401 e uma mensagem de erro com o email ou senha inválido", async () => {
      const response = await chai
        .request(app)
        .post("/login")
        .send(mock.loginWithInvalidEmailAndPassword);

      chai.expect(response.status).to.be.equal(401);
      chai
        .expect(response.body)
        .to.have.property("message", "Incorrect email or password");
    });
  });
});
