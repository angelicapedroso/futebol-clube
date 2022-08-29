import { Request, Response } from 'express';
// import AuthService from '../services/auth.service';
import MatchService from '../services/match.service';

const MatchController = {
  async getAll(req: Request, res: Response): Promise<Response> {
    const matches = await MatchService.getAll();
    return res.status(200).json(matches);
  },

  async create(req: Request, res: Response): Promise<Response> {
    // await AuthService.loginValidate(req.headers.authorization as string);
    const match = await MatchService.create(req.body);
    return res.status(201).json(match);
  },

  async updateStatus(req: Request, res: Response): Promise<Response> {
    await MatchService.updateStatus(Number(req.params.id));
    return res.status(200).json({ message: 'Finished' });
  },
};

export default MatchController;
