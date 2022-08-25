import * as jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret';

const generateTokenJWT = (payload: string | object) => jwt.sign(payload, SECRET);

export default generateTokenJWT;
