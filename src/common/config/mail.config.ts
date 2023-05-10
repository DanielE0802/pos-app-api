import * as dotenv from 'dotenv';

dotenv.config();

/* Exporting the SEND_GRID configuration. */
export const MAIL = {
  host: process.env.MAIL_HOST,
  privateKey: process.env.MAIL_PRIVATE_KEY,
};
