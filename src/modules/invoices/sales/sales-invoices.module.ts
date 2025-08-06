import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultStrategy } from 'src/common/constants/app/jwt.app';
import { SellInvoicesService } from './sales-invoices.service';
import { SellInvoicesController } from './sales-invoices.controller';
import {
  InvoiceCustomer,
  SalesInvoice,
  SalesInvoiceItem,
} from 'src/common/entities';

@Module({
  imports: [
    PassportModule.register(DefaultStrategy),
    TypeOrmModule.forFeature([InvoiceCustomer, SalesInvoiceItem, SalesInvoice]),
  ],
  controllers: [SellInvoicesController],
  providers: [SellInvoicesService],
})
export class SellInvoicesModule {}
