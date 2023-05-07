import * as dotenv from 'dotenv';

dotenv.config();

export const JwtConfig = {
  secretKey: process.env.JWT_SECRET_KEY || '',
  strategy: 'jwt',
  tokenExpireIn: process.env.JWT_EXPIRED_TOKEN || '1h',
};
