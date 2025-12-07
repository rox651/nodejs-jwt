import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL || 'postgres://localhost:5432/nodejs_jwt',
  jwtSecret: process.env.JWT_SECRET || 'default_secret',
};

