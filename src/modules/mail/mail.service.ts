import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { MailTemplates } from './config/mailer.config';
import {
  ActivationLinkEvent,
  ReqResetPasswordEvent,
} from 'src/modules/mail/events';

@Injectable()
export class MailService {
  private readonly _logger = new Logger(MailService.name);
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyEmail(
    email: string,
    activationLinkParams: Omit<ActivationLinkEvent, 'email'>,
  ) {
    const templateInfo = MailTemplates.ACTIVATION_LINK;
    await this.mailerService.sendMail({
      to: email,
      subject: templateInfo.subject,
      template: templateInfo.template,
      context: {
        name: activationLinkParams.name,
        activationLink: activationLinkParams.activationLink,
      },
    });
  }

  async sendWelcomeEmail(email: string): Promise<void> {
    const templateInfo = MailTemplates.REGISTER_SUCCESS;
    await this.mailerService.sendMail({
      to: email,
      subject: templateInfo.subject,
      template: templateInfo.template,
      context: {
        email: email,
      },
    });
  }

  async sendWelcomeEmailWithPartials(email: string): Promise<void> {
    const templateInfo = {
      ...MailTemplates.REGISTER_SUCCESS,
      template: 'auth/register-success-with-partials',
    };
    await this.mailerService.sendMail({
      to: email,
      subject: templateInfo.subject,
      template: templateInfo.template,
      context: {
        email: email,
      },
    });
  }

  async sendReqResetPasswordEmail(
    email: string,
    reqResetEmailParams: Omit<ReqResetPasswordEvent, 'email'>,
  ) {
    const templateInfo = MailTemplates.REQ_RESET_PASSWORD;
    await this.mailerService.sendMail({
      to: email,
      subject: templateInfo.subject,
      template: templateInfo.template,
      context: {
        name: reqResetEmailParams.name,
        // resetLink: reqResetEmailParams.resetLink,
      },
    });
  }
}
