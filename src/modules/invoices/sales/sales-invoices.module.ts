import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtConfig } from 'src/common/config/jwt.config';
import { SellInvoicesService } from './sales-invoices.service';
import { SellInvoicesController } from './sales-invoices.controller';
import { InvoiceCustomer, SalesInvoiceItem, SalesInvoice } from './entities';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: JwtConfig.strategy }),
    TypeOrmModule.forFeature([InvoiceCustomer, SalesInvoiceItem, SalesInvoice]),
  ],
  controllers: [SellInvoicesController],
  providers: [SellInvoicesService],
})
export class SellInvoicesModule {}
