import { MailerService } from '@nestjs-modules/mailer';
import nodemailer from 'nodemailer';

export const MailProviders = [
  {
    provide: MailerService,
    useFactory: () => {
      return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-password',
        },
      });
    },
  },
];
