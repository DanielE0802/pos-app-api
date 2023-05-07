import * as dotenv from 'dotenv';

dotenv.config();

export const JwtConfig = {
  secretKey: 'vTXmqd8WrgIYM', // process.env.JWT_SECRET_KEY
  strategy: 'jwt',
  tokenExpireIn: '1h', // process.env.JWT_EXPIRED_TOKEN
};
