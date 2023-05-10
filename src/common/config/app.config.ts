import * as dotenv from 'dotenv';

dotenv.config();

export const APP_CONFIG = {
  appPort: Number(process.env.APP_PORT || 3000),
  appUrl: process.env.APP_URL,
};

export const APP_BASE_URL = `${APP_CONFIG.appUrl}:${APP_CONFIG.appPort}`;
