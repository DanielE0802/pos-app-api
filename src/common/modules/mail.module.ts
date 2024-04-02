import { join } from 'path';
import { ConfigType } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from '../../modules/mail/mail.service';
import configuration from '../config/configuration';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [configuration.KEY],
      useFactory: async (configService: ConfigType<typeof configuration>) => {
        return {
          transport: {
            host: configService.EMAIL.HOST,
            port: configService.EMAIL.PORT,
            secure: configService.EMAIL.SECURE,
            auth: {
              user: configService.EMAIL.USER,
              pass: configService.EMAIL.PASSWORD,
            },
          },
          defaults: {
            from: configService.EMAIL.FROM,
          },
          template: {
            dir: join(__dirname, '../constants/templates/hbs/'), // directorio de las plantillas
            adapter: new HandlebarsAdapter(), // adaptador para handlebars
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
