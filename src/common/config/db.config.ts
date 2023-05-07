import * as dotenv from 'dotenv';

dotenv.config();

/* Exporting the database configuration. */
export const dbConfig: Record<string, any> = {
  dbClient: process.env.DB_CLIENT || 'mysql',
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.DB_PASSWORD,
  dbUser: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  dbPort: Number(process.env.DB_PORT || '3306'),
};
