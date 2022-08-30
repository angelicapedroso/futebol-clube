import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

const LeaderboardController = {
  async getLeaderboardHome(req: Request, res: Response): Promise<Response> {
    const result = await LeaderboardService.getLeaderBoardByType('home');
    return res.status(200).json(result);
  },

  async getLeaderboardAway(req: Request, res: Response): Promise<Response> {
    const result = await LeaderboardService.getLeaderBoardByType('away');
    return res.status(200).json(result);
  },

  async getLeaderboardAll(req: Request, res: Response): Promise<Response> {
    const result = await LeaderboardService.getLeaderBoardByType('all');
    return res.status(200).json(result);
  },
};

export default LeaderboardController;
