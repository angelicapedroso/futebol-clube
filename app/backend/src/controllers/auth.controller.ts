import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

const AuthController = {

  async login(req: Request, res: Response): Promise<void> {
    const token = await AuthService.login(req.body);
    res.status(200).json(token);
  },
};

export default AuthController;
