import * as express from 'express';
import * as cors from 'cors';
import 'express-async-errors';
import httpErrorMiddleware from './middleware/http.error.middleware';
import authRoutes from './routes/auth.routes';
import teamRoutes from './routes/team.routes';
import matchRoutes from './routes/match.routes';
import leaderboardRoutes from './routes/leaderboard.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(cors());

    this.app.use('/login', authRoutes);
    this.app.use('/teams', teamRoutes);
    this.app.use('/matches', matchRoutes);
    this.app.use('/leaderboard', leaderboardRoutes);

    this.app.use(httpErrorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
