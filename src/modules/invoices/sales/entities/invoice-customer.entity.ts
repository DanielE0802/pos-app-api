import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SalesInvoice } from './sales-invoice.entity';

// Esta entidad representa el cliente al que se le emite la factura.
@Entity()
export class InvoiceCustomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // TODO: Add relations with contacts

  @OneToMany(() => SalesInvoice, (salesInvoice) => salesInvoice.invoiceCustomer)
  salesInvoices: SalesInvoice[];
}
