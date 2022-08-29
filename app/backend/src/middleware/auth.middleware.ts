import { NextFunction, Request, Response } from 'express';
import HttpException from '../share/http.exception';
import AuthService from '../services/auth.service';

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    await AuthService.loginValidate(authorization as string);
  } catch (err) {
    throw new HttpException(401, 'Token must be a valid token');
  }
  next();
};

export default authMiddleware;
