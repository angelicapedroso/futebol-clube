import HttpException from '../share/http.exception';
import ILogin from '../interfaces/login.interface';

export const checkEmptyLogin = (data: ILogin): void => {
  if (!data.email || !data.password) {
    throw new HttpException(400, 'All fields must be filled');
  }
};

export const checkCorrectLogin = (user: string | null, matchPassword: boolean): void => {
  if (!user || !matchPassword) {
    throw new HttpException(401, 'Incorrect email or password');
  };
};
