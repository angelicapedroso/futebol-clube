import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import * as Sinon from "sinon";
import { app } from "../app";
import Match from "../database/models/Match";
import * as mock from "./mocks/match.mock";

chai.use(chaiHttp);

describe("Testes de integração - Seção 3: Matches", () => {
  describe("endpoint /matches", () => {
    describe("getAll", () => {
      beforeEach(() => {
        Sinon.stub(Match, "findAll").resolves([mock.matchMock as unknown as Match]);
      });

      afterEach(() => {
        Sinon.restore();
      });

      it("Deve retornar status 200 com retorno da lista de partidas", async () => {
        const response = await chai
          .request(app)
          .get("/matches")

        // const [team] = response.body;

        chai.expect(response.status).to.be.equal(200);
        chai.expect(response.body).to.be.deep.equal([mock.matchMock]);
      });
    });
  });
});
