import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SellInvoicesService } from './sales-invoices.service';
import { CreateSalesInvoiceDto } from './dto/create-invoice.dto';
import { UpdateSalesInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoices')
export class SellInvoicesController {
  constructor(private readonly invoicesService: SellInvoicesService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateSalesInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateSalesInvoiceDto,
  ) {
    return this.invoicesService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(+id);
  }
}
