import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
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

  @Column({ name: 'invoice_customer_id', type: 'varchar', nullable: true })
  invoiceCustomerId: string;

  @ManyToOne(() => InvoiceCustomer)
  @JoinColumn({ name: 'invoice_customer_id' })
  invoiceCustomer: InvoiceCustomer;

  @OneToMany(() => SalesInvoiceItem, (item) => item.salesInvoice)
  items: SalesInvoiceItem[];

  // auto columns
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
