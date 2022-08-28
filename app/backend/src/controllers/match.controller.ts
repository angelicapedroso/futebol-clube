import { Request, Response } from 'express';
import MatchService from '../services/match.service';

const MatchController = {
  async getAll(req: Request, res: Response): Promise<Response> {
    const matches = await MatchService.getAll();
    return res.status(200).json(matches);
  },
};

export default MatchController;
