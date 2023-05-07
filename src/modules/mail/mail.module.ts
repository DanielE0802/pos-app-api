import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { SEND_GRID } from 'src/common/config/mail.config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: SEND_GRID.SG_HOST,
        secure: false,
        auth: {
          user: SEND_GRID.SG_USER,
          pass: SEND_GRID.SG_PASS,
        },
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
