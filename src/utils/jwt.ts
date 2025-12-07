import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export const generateToken = (payload: object) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};

