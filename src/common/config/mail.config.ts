import * as dotenv from 'dotenv';

dotenv.config();

/* Exporting the SEND_GRID configuration. */
export const SEND_GRID = {
  SG_HOST: process.env.SG_HOST || '',
  SG_USER: process.env.SG_USER || '',
  SG_PASS: process.env.SG_PASS || '',
  SG_BACKEND_URL: process.env.SG_BACKEND_URL || 'http://[::1]:3000',
  SG_FRONTEND_URL: process.env.SG_FRONTEND_URL || 'www.frontend-url.com',
};
