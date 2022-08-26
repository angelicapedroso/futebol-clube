import * as bcrypt from 'bcryptjs';
import ILogin from '../interfaces/login.interface';
import HttpException from '../share/http.exception';
import User from '../database/models/User';
import generateTokenJWT, { verifyTokenJWT } from '../utils/tokenJWT';
import { checkCorrectLogin, checkEmptyLogin } from '../validation/login.validation';

const AuthService = {
  async login(data: ILogin): Promise<object> {
    checkEmptyLogin(data);
    const user = await User.findOne({ raw: true, where: { email: data.email } });
    const isPasswordMatching = await bcrypt.compare(data.password, user?.password || '');
    checkCorrectLogin(user as string | null, isPasswordMatching);
    const token = generateTokenJWT(data.email);
    return { token };
  },

  async loginValidate(token: string): Promise<object> {
    const decoded = verifyTokenJWT(token);
    const user = await User.findOne({ raw: true, where: { email: decoded } });
    if (!user) throw new HttpException(401, 'Invalid token');
    return { role: user.role };
  },
};

export default AuthService;
