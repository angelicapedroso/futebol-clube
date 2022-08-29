import { Request, Response } from 'express';
import MatchService from '../services/match.service';

const MatchController = {
  async getAll(req: Request, res: Response): Promise<Response> {
    const matches = await MatchService.getAll();
    return res.status(200).json(matches);
  },

  async create(req: Request, res: Response): Promise<Response> {
    const match = await MatchService.create(req.body);
    return res.status(201).json(match);
  },

  async updateStatus(req: Request, res: Response): Promise<Response> {
    await MatchService.updateStatus(Number(req.params.id));
    return res.status(200).json({ message: 'Finished' });
  },

  async updateGoals(req: Request, res: Response): Promise<Response> {
    await MatchService.updateGoals(Number(req.params.id), req.body);
    return res.status(200).json({ message: 'Goals updated' });
  },
};

export default MatchController;
