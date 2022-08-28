import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import * as Sinon from "sinon";
import { app } from "../app";
import Team from "../database/models/Team";
import * as mock from "./mocks/team.mock";

chai.use(chaiHttp);

describe("Testes de integração - Seção 2: Teams", () => {
  describe("endpoint /teams", () => {
    describe("getAll", () => {
      beforeEach(() => {
        Sinon.stub(Team, "findAll").resolves([mock.teamMock as Team]);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it("Deve retornar status 200 e um array com os times", async () => {
        const response = await chai
          .request(app)
          .get("/teams")

        const [team] = response.body;

        chai.expect(response.status).to.be.equal(200);
        chai.expect(team.id).to.equal(mock.teamMock.id);
        chai.expect(team.teamName).to.equal(mock.teamMock.teamName);
      });
    });

    describe("getById", () => {
      beforeEach(() => {
        Sinon.stub(Team, "findOne").resolves(mock.teamMock as Team);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it("Deve retornar status 200 e um time", async () => {
        const response = await chai
          .request(app)
          .get("/teams/1")

        const team = response.body;

        chai.expect(response.status).to.be.equal(200);
        chai.expect(team.id).to.equal(mock.teamMock.id);
        chai.expect(team.teamName).to.equal(mock.teamMock.teamName);
      });
    });
  });
});
