import { join } from 'path';
import { ConfigType } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import configuration from '../../common/config/configuration';

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
            from: `"Ally 360" <${configService.EMAIL.FROM}>`,
          },

          // EJS Config
          // template: {
          //   dir: join(__dirname, 'templates'), // Ruta a las plantillas EJS
          //   adapter: {
          //     compile: (template: string, options: any) => {
          //       const ejs = require('ejs');
          //       return ejs.compile(template, options);
          //     },
          //   },
          // },

          // Handlebars Config
          // template: {
          //   dir: join(__dirname, 'templates'), // Ruta ajustada a tu estructura
          //   adapter: new HandlebarsAdapter(),
          //   options: {
          //     strict: true, // Asegura que las variables no definidas generen errores
          //   },
          // },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
