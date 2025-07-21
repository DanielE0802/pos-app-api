import * as entities from '../../common/entities';

export const config = {
  port: process.env.PORT,
  db: {
    entities: [...Object.values(entities)],
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: 'public',
  },
  smtp: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_SECURE == 'true',
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM,
  },
  jwt: {
    secret: process.env.SECRET || 'default-secret-key',
    expire_in: process.env.TOKEN_EXPIRE_IN || '24h',
  },
};
