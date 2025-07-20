import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ActivationLinkEvent,
  ReqResetPasswordEvent,
} from 'src/modules/mail/events';
import { EmailActionsEvent } from './enums/email-events.enum';
import { WelcomeEvent } from './events/welcome.event';
import { MailService } from './mail.service';

@Injectable()
export class MailListener {
  private _logger = new Logger(MailListener.name);
  constructor(private readonly _mailService: MailService) {}

  @OnEvent(EmailActionsEvent.ActivationLink)
  async handleSendActivationLink(event: ActivationLinkEvent) {
    this._logger.debug(`Enviando email de verificación a: ${event.email}`);
    try {
      await this._mailService.sendVerifyEmail(event.email, {
        name: event.name,
        activationLink: event.activationLink,
      });
      this._logger.debug(`✅ Email enviado a: ${event.email}`);
    } catch (error) {
      this._logger.error(`❌ Error enviando email: ${error.message}`);
    }
  }

  @OnEvent(EmailActionsEvent.UserRegistered)
  async handleWelcome(event: WelcomeEvent) {
    this._logger.debug(`Enviando email de verificación a: ${event.email}`);
    try {
      await this._mailService.sendWelcomeEmail(event.email);
      this._logger.debug(`✅ Email enviado a: ${event.email}`);
    } catch (error) {
      this._logger.error(`❌ Error enviando email: ${error.message}`);
    }
  }

  @OnEvent(EmailActionsEvent.ReqResetPassword)
  async handleReqResetPassword(event: ReqResetPasswordEvent) {
    this._logger.debug(`Enviando email de verificación a: ${event.email}`);
    try {
      await this._mailService.sendReqResetPasswordEmail(event.email, {
        name: event.name,
      });
      this._logger.debug(`✅ Email enviado a: ${event.email}`);
    } catch (error) {
      this._logger.error(`❌ Error enviando email: ${error.message}`);
    }
  }
}
