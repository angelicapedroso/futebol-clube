import { Request, Response } from 'express';
import TeamService from '../services/team.service';

const TeamController = {
  async getAll(_req: Request, res: Response): Promise<Response> {
    const teams = await TeamService.getAll();
    return res.status(200).json(teams);
  },
};

export default TeamController;
