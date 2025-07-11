import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => SalesInvoice, (salesInvoice) => salesInvoice.items)
  salesInvoice: SalesInvoice;
}
