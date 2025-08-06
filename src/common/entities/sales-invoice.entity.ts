import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { SalesInvoiceItem } from './sales-invoice-item.entity';
import { InvoiceCustomer } from './invoice-customer.entity';

/**
 * Representa una factura de venta
 */
@Entity('sales_invoices')
export class SalesInvoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  invoiceNumber: string;

  @Column()
  createDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalTaxes: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  shipping: number;

  @Column()
  status: number;

  @Column()
  method: string;

  @Column()
  paymentTerm: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column()
  currency: string;

  @Column()
  paymentMethod: string;

  @ManyToOne(() => InvoiceCustomer, (customer) => customer.salesInvoices)
  invoiceCustomer: InvoiceCustomer;

  @OneToMany(() => SalesInvoiceItem, (item) => item.salesInvoice)
  items: SalesInvoiceItem[];
}
