import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { SalesInvoice } from './sales-invoice.entity';

// Esta entidad representa el cliente al que se le emite la factura.
@Entity()
export class InvoiceCustomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // TODO: Add relations with contacts

  @OneToMany(() => SalesInvoice, (salesInvoice) => salesInvoice.invoiceCustomer)
  salesInvoices: SalesInvoice[];

  // auto columns
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
