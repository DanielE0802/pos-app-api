import { PartialType } from '@nestjs/swagger';
import { CreateSalesInvoiceDto } from './create-invoice.dto';

export class UpdateSalesInvoiceDto extends PartialType(CreateSalesInvoiceDto) {}
