import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { EmailsTemplates } from './templates/email-html.template';
import {
  ActivationLinkEvent,
  ReqResetPasswordEvent,
  WelcomeEvent,
} from 'src/modules/mail/events';

@Injectable()
export class MailService {
  private readonly _logger = new Logger(MailService.name);
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(
    email: string,
    welcomeEmailParams: Omit<WelcomeEvent, 'email'>,
  ): Promise<void> {
    let template = EmailsTemplates.Welcome;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Bienvenido a Ally360.',
      html: template.replace('{{username}}', welcomeEmailParams.name),
    });
  }

  async sendVerifyEmail(
    email: string,
    activationLinkParams: Omit<ActivationLinkEvent, 'email'>,
  ) {
    const _templateInfo = EmailsTemplates.ActivationAccount;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Activa tu cuenta.',
      html: _templateInfo
        .replace('{{name}}', activationLinkParams.name)
        .replace('{{activationLink}}', activationLinkParams.activationLink),
    });
  }

  async sendReqResetPasswordEmail(
    email: string,
    reqResetEmailParams: Omit<ReqResetPasswordEvent, 'email'>,
  ) {
    const _templateInfo = EmailsTemplates.ReqResetPassword;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reestablece tu contraseña.',
      html: _templateInfo
        .replace('{{name}}', reqResetEmailParams.name)
        .replace('{{change_password_url}}', '#'),
    });
  }
}
