import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';
import { APP_BASE_URL } from 'src/common/config/app.config';
import { MAIL } from 'src/common/constants/templates.mail';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyEmail(user: any) {
    return 'Email Sent';

    const url = `${APP_BASE_URL}/auth/activate-account?uid=${user.id}&code=${user.verifyToken}`;
    console.log(url);

    return await this.mailerService.sendMail(
      this.getMailConfig(user, url, MAIL.activation_account),
    );
  }

  async sendResetPasswordEmail(user: any) {
    return 'Email Sent';

    const url = `/view/reset-password?tk=${user.resetPasswordToken}`;

    return await this.mailerService.sendMail(
      this.getMailConfig(user, url, MAIL.req_reset_password),
    );
  }

  // +--------------------------------+
  // |  Private Encapsulated Methods  |
  // +--------------------------------+

  private getMailConfig(
    user: any,
    url: string,
    template: Record<string, any>,
  ): ISendMailOptions {
    return {
      to: user.email,
      from: template.config.from,
      subject: template.config.subject,
      template: template.template,
      context: {
        // Filling curly brackets with content
        name: user.username,
        url,
      },
    };
  }
}
