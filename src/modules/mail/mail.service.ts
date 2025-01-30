import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { WelcomeEmailDto } from './dtos/welcome-email.dto';
import { EmailsTemplates } from './templates/email-html.template';
import { ActivationAccountEmailDto } from './dtos/activation-account-email.dto';

@Injectable()
export class MailService {
  private readonly _logger = new Logger(MailService.name);
  constructor(private readonly mailerService: MailerService) {}

  /**
   * Enviar un correo de bienvenida
   * @param to - Dirección de correo del destinatario
   * @param username - Nombre del usuario
   */
  async sendWelcomeEmail(
    to: string,
    templateVars: WelcomeEmailDto,
  ): Promise<void> {
    this._logger.log(`Email sending to ${to}...`, { templateVars });

    const { username } = templateVars;
    let template = EmailsTemplates.Welcome;
    const emailInfo = await this.mailerService.sendMail({
      to,
      subject: 'Bienvenido a Ally360.',

      /* HTML body content */
      // text: '¡Gracias por registrarte!',
      html: template.replace('{{username}}', username),

      /* EJS template */
      // template: 'welcome', // Nombre del archivo .hbs (sin extensión)
      // context: {
      //   appName: 'Ally 360',
      //   username,
      // },
    });
    this._logger.log(`Email sent to ${to}`, { emailInfo });
  }

  async sendVerifyEmail(to: string, data: ActivationAccountEmailDto) {
    const _templateInfo = EmailsTemplates.ActivationAccount;
    return await this.mailerService.sendMail({
      to,
      subject: 'Activa tu cuenta.',

      /* HTML body content */
      // text: '¡Activa tu cuenta!',
      html: _templateInfo
        .replace('{{name}}', data.name)
        .replace('{{activationLink}}', data.activationLink),
    });
  }

  // async sendResetPasswordEmail(user: any) {
  //   return 'Email Sent';

  //   const url = `/view/reset-password?tk=${user.resetPasswordToken}`;

  //   return await this.mailerService.sendMail(
  //     this.getMailConfig(user, url, EmailTemplates.req_reset_password),
  //   );
  // }

  // +--------------------------------+
  // |  Private Encapsulated Methods  |
  // +--------------------------------+

  // private getMailConfig(
  //   user: any,
  //   url: string,
  //   template: Record<string, any>,
  // ): ISendMailOptions {
  //   return {
  //     to: user.email,
  //     subject: template.config.subject,
  //     template: template.template,
  //     context: {
  //       // Filling curly brackets with content
  //       name: user.username,
  //       url,
  //     },
  //   };
  // }
}
