import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { MailListener } from './mail.listener';
import * as Events from './events';
import { MailTestController } from './mail-test.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const templatesDir = join(__dirname, 'templates');
        const partialsDir = join(templatesDir, 'partials');

        return {
          transport: {
            host: config.get('smtp').host,
            port: config.get('smtp').port,
            secure: config.get('smtp').secure,
            auth: {
              user: config.get('smtp').user,
              pass: config.get('smtp').password,
            },
          },
          defaults: {
            from: `"Ally 360" <${config.get('smtp').from}>`,
          },
          template: {
            dir: templatesDir,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
          options: {
            partials: {
              dir: partialsDir,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService, MailListener, ...Object.values(Events)],
  exports: [MailService, MailListener],
  controllers: [MailTestController],
})
export class MailModule {}
