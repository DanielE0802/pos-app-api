import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail/test')
export class MailTestController {
  constructor(private readonly mailService: MailService) {}

  @Post('welcome')
  async sendTestWelcome() {
    const email = 'test@example.com';
    const name = 'Test User';
    await this.mailService.sendWelcomeEmail({
      email,
    });
    await this.mailService.sendVerifyEmail({
      email,
      name,
      activationLink: 'http://example.com/activate',
    });
    await this.mailService.sendReqResetPasswordEmail({
      email,
      name,
      resetLink: 'http://example.com/reset',
    });

    await this.mailService.passwordResetSuccess({
      name,
      email,
    });

    this.mailService.accountDeactivated({
      name,
      email,
    });

    await this.mailService.inventoryLow({
      email,
      product: 'Test Product',
      location: 'Test Location',
      quantity: 5,
    });

    await this.mailService.inventoryOut({
      email,
      product: 'Test Product',
      location: 'Test Location',
      lastUpdate: new Date(),
    });

    await this.mailService.inventoryTransferComplete({
      email,
      product: 'Test Product',
      fromLocation: 'Location A',
      toLocation: 'Location B',
      quantity: 10,
      date: new Date(),
    });

    await this.mailService.reportDailySummary({
      email,
      date: new Date(),
      sales: 100,
      purchases: 50,
      newProducts: 5,
      stockMovements: 20,
      lowStockCount: ['Product A', 'Product B'],
      outOfStockCount: ['Product C'],
      transfers: 3,
      name: 'Test User',
      summary: 'Daily summary of sales and inventory.',
    });
    await this.mailService.reportMonthlySummary({
      email,
      name: 'Test User',
      month: 'January',
      year: 2023,
      totalSales: 1000,
      totalPurchases: 500,
      newCustomers: 10,
      topProducts: [{ name: 'Product A', quantity: 100 }],
      avgInventory: 200,
      profitability: 300,
      reportLink: 'http://example.com/report',
    });
    return {
      success: true,
      message: `Correo de bienvenida enviado a ${email}`,
    };
  }

  @Post('verify')
  async sendTestVerify() {
    const body = {
      email: 'test@example.com',
      name: 'Test User',
      activationLink: 'http://example.com/activate',
    };
    await this.mailService.sendVerifyEmail({
      email: body.email,
      name: body.name,
      activationLink: body.activationLink,
    });
    return {
      success: true,
      message: `Correo de verificación enviado a ${body.email}`,
    };
  }
}
