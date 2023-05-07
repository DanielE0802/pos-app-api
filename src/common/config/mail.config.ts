import * as dotenv from 'dotenv';

dotenv.config();

/* Exporting the SEND_GRID configuration. */
export const SEND_GRID = {
  SG_HOST: process.env.SG_HOST || '',
  SG_USER: process.env.SG_USER || '',
  SG_PASS: process.env.SG_PASS || '',
  SG_BACKEND_URL: process.env.SG_API_URL,
};
