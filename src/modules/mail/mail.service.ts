import {
  ReportDailySummaryEvent,
  ReportMonthlySummaryEvent,
} from './events/report.events';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { MailTemplates } from './config/mailer.config';
import {
  AccountDeactivated,
  ActivationLinkEvent,
  PasswordResetSuccessEvent,
  ReqResetPasswordEvent,
  WelcomeEvent,
} from 'src/modules/mail/events';
import {
  InventoryOutEvent,
  InventoryTransferCompleteEvent,
  InvetoryLowEvent,
} from './events/inventory.events';

@Injectable()
export class MailService {
  private readonly _logger = new Logger(MailService.name);
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyEmail(activationLinkParams: ActivationLinkEvent) {
    const templateInfo = MailTemplates.ACTIVATION_LINK;
    await this.mailerService.sendMail({
      to: activationLinkParams.email,
      subject: templateInfo.subject,
      template: templateInfo.template,
      context: {
        name: activationLinkParams.name,
        activationLink: activationLinkParams.activationLink,
      },
    });
  }

  async sendWelcomeEmail(sendWelcomeParams: WelcomeEvent): Promise<void> {
    const templateInfo = MailTemplates.REGISTER_SUCCESS;
    await this.mailerService.sendMail({
      to: sendWelcomeParams.email,
      subject: templateInfo.subject,
      template: templateInfo.template,
      context: {
        email: sendWelcomeParams.email,
      },
    });
  }

  async sendReqResetPasswordEmail(reqResetEmailParams: ReqResetPasswordEvent) {
    const templateInfo = MailTemplates.REQ_RESET_PASSWORD;
    await this.mailerService.sendMail({
      to: reqResetEmailParams.email,
      subject: templateInfo.subject,
      template: templateInfo.template,
      context: {
        name: reqResetEmailParams.name,
        resetLink: reqResetEmailParams.resetLink,
      },
    });
  }

  async passwordResetSuccess(
    passwordResetSuccessParams: PasswordResetSuccessEvent,
  ): Promise<void> {
    const templateInfo = MailTemplates.PASSWORD_RESET_SUCCESS;
    await this.mailerService.sendMail({
      to: passwordResetSuccessParams.email,
      subject: templateInfo.subject,
      template: templateInfo.template,
      context: {
        name: passwordResetSuccessParams.name,
      },
    });
  }

  async accountDeactivated(
    accountDeactivatedParams: AccountDeactivated,
  ): Promise<void> {
    const templateInfo = MailTemplates.ACCOUNT_DEACTIVATED;
    await this.mailerService.sendMail({
      to: accountDeactivatedParams.email,
      subject: templateInfo.subject,
      template: templateInfo.template,
      context: {
        name: accountDeactivatedParams.name,
      },
    });
  }

  async inventoryLow(inventoryLowParams: InvetoryLowEvent): Promise<void> {
    const templateInfo = MailTemplates.INVENTORY_LOW;
    await this.mailerService.sendMail({
      to: inventoryLowParams.email,
      subject: templateInfo.subject,
      template: templateInfo.template,
      context: {
        product: inventoryLowParams.product,
        quantity: inventoryLowParams.quantity,
        location: inventoryLowParams.location,
      },
    });
  }

  async inventoryOut(inventoryOutParams: InventoryOutEvent): Promise<void> {
    const templateInfo = MailTemplates.INVENTORY_OUT;
    await this.mailerService.sendMail({
      to: inventoryOutParams.email,
      subject: templateInfo.subject,
      template: templateInfo.template,
      context: {
        product: inventoryOutParams.product,
        location: inventoryOutParams.location,
        lastUpdate: inventoryOutParams.lastUpdate.toISOString(),
      },
    });
  }

  async inventoryTransferComplete(
    inventoryTransferCompleteParams: InventoryTransferCompleteEvent,
  ): Promise<void> {
    const templateInfo = MailTemplates.INVENTORY_TRANSFER_COMPLETE;
    await this.mailerService.sendMail({
      to: inventoryTransferCompleteParams.email,
      subject: templateInfo.subject,
      template: templateInfo.template,
      context: {
        product: inventoryTransferCompleteParams.product,
        fromLocation: inventoryTransferCompleteParams.fromLocation,
        toLocation: inventoryTransferCompleteParams.toLocation,
        quantity: inventoryTransferCompleteParams.quantity,
        date: inventoryTransferCompleteParams.date.toISOString(),
      },
    });
  }

  async reportDailySummary(reportDailySummaryEvent: ReportDailySummaryEvent) {
    const templateInfo = MailTemplates.REPORT_DAILY_SUMMARY;
    await this.mailerService.sendMail({
      to: reportDailySummaryEvent.email,
      subject: templateInfo.subject,
      template: templateInfo.template,
      context: {
        date: reportDailySummaryEvent.date,
        summary: reportDailySummaryEvent.summary,
        sales: reportDailySummaryEvent.sales,
        purchases: reportDailySummaryEvent.purchases,
        newProducts: reportDailySummaryEvent.newProducts,
        stockMovements: reportDailySummaryEvent.stockMovements,
        lowStockCount: reportDailySummaryEvent.lowStockCount,
        outOfStockCount: reportDailySummaryEvent.outOfStockCount,
        transfers: reportDailySummaryEvent.transfers,
        name: reportDailySummaryEvent.name,
      },
    });
  }

  async reportMonthlySummary(
    reportMonthlySummaryEvent: ReportMonthlySummaryEvent,
  ) {
    const templateInfo = MailTemplates.REPORT_MONTHLY_SUMMARY;
    await this.mailerService.sendMail({
      to: reportMonthlySummaryEvent.email,
      subject: templateInfo.subject,
      template: templateInfo.template,
      context: {
        month: reportMonthlySummaryEvent.month,
        year: reportMonthlySummaryEvent.year,
        totalSales: reportMonthlySummaryEvent.totalSales,
        totalPurchases: reportMonthlySummaryEvent.totalPurchases,
        newCustomers: reportMonthlySummaryEvent.newCustomers,
        topProducts: reportMonthlySummaryEvent.topProducts,
        avgInventory: reportMonthlySummaryEvent.avgInventory,
        profitability: reportMonthlySummaryEvent.profitability,
        name: reportMonthlySummaryEvent.name,
        reportLink: reportMonthlySummaryEvent.reportLink,
      },
    });
  }
}
