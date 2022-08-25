import * as bcrypt from 'bcryptjs';
import ILogin from '../interfaces/login.interface';
import HttpException from '../share/http.exception';
import User from '../database/models/User';
import generateTokenJWT from '../utils/tokenJWT';

const AuthService = {

  async login(data: ILogin): Promise<object> {
    const { email, password } = data;
    if (!email || !password) throw new HttpException(400, 'All fields must be filled');
    const user = await User.findOne({ raw: true, where: { email } });
    const isPasswordMatching = await bcrypt.compare(password, user?.password || '');
    if (!user || !isPasswordMatching) throw new HttpException(401, 'Incorrect email or password');
    const token = generateTokenJWT(email);
    return { token };
  },
};

export default AuthService;
