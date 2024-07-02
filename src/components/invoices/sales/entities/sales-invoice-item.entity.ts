import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SalesInvoice } from './sales-invoice.entity';

/**
 * Representa un ítem dentro de una factura de venta, incluyendo detalles del producto, cantidad, precio, total, impuestos y referencia.
 */
@Entity()
export class SalesInvoiceItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // one-to-one with product
  @Column()
  product: string;

  // @Column()
  // description: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  taxes: number;

  // Relations columns
  @Column({ name: 'sales_invoice', type: 'varchar', nullable: true })
  salesInvoiceId: string;

  @ManyToOne(() => SalesInvoice)
  @JoinColumn({ name: 'sales_invoice' })
  salesInvoice: SalesInvoice;

  // auto columns
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
