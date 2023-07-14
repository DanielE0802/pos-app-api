import * as dotenv from 'dotenv';

dotenv.config();
let configuration: Record<string, any>;

switch (process.env.ENVIRONMENT) {
  case 'local':
    configuration = {
      dbClient: 'mysql',
      dbHost: 'localhost',
      dbPassword: 'mysql',
      dbUser: 'root',
      dbName: 'pos_app',
      dbPort: 3306,
      sslMode: 'REQUIRED',
    };
    break;
  case 'prod':
    configuration = {
      dbClient: process.env.DB_CLIENT || 'mysql',
      dbHost: process.env.DB_HOST,
      dbPassword: process.env.DB_PASSWORD,
      dbUser: process.env.DB_USER,
      dbName: process.env.DB_NAME,
      dbPort: Number(process.env.DB_PORT || '3306'),
      sslMode: process.env.SSLMODE,
    };
    break;
  default:
    break;
}

/* Exporting the database configuration. */
export const dbConfig: Record<string, any> = configuration;
