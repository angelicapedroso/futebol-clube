import { Request, Response } from 'express';
import TeamService from '../services/team.service';

const TeamController = {
  async getAll(_req: Request, res: Response): Promise<Response> {
    const teams = await TeamService.getAll();
    return res.status(200).json(teams);
  },

  async getById(req: Request, res: Response): Promise<Response> {
    const team = await TeamService.getById(Number(req.params.id));
    return res.status(200).json(team);
  },
};

export default TeamController;
