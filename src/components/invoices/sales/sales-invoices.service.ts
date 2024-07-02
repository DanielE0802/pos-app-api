import { Injectable } from '@nestjs/common';
import { CreateSalesInvoiceDto } from './dto/create-invoice.dto';
import { UpdateSalesInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class SellInvoicesService {
  create(createInvoiceDto: CreateSalesInvoiceDto) {
    return 'This action adds a new invoice';
  }

  findAll() {
    return `This action returns all invoices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateSalesInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
