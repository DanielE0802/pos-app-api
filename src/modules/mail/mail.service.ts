import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';
import { SEND_GRID } from 'src/common/config/mail.config';
import { MAIL } from 'src/common/constants/templates.mail';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendActivationEmail(user: any) {
    const url = `${SEND_GRID.SG_BACKEND_URL}/auth/activate-account?uid=${user.id}&code=${user.verifyToken}`;
    console.log(url);

    return await this.mailerService.sendMail(
      this.getMailConfig(user, url, MAIL.activation_account),
    );
  }

  async sendResetPasswordEmail(user: any) {
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
