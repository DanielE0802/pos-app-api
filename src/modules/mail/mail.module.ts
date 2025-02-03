import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
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
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
