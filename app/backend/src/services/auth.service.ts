import * as bcrypt from 'bcryptjs';
import ILogin from '../interfaces/login.interface';
import HttpException from '../share/http.exception';
import User from '../database/models/User';
import generateTokenJWT from '../utils/tokenJWT';

const AuthService = {

  async login(data: ILogin): Promise<object> {
    const { email, password } = data;
    const user = await User.findOne({ where: { email } });
    const isPasswordMatching = await bcrypt.compare(password, user?.password as string);
    if (!isPasswordMatching) throw new HttpException(401, 'Credenciais inválidas');
    const token = generateTokenJWT(email);
    return { token };
  },
};

export default AuthService;
