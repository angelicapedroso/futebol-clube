import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

const AuthController = {
  async login(req: Request, res: Response): Promise<Response> {
    const token = await AuthService.login(req.body);
    return res.status(200).json(token);
  },

  async loginValidate(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const role = await AuthService.loginValidate(authorization as string);
    return res.status(200).json(role);
  },
};

export default AuthController;
