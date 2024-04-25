import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Contact } from './contact.entity';

@Entity('identities')
export class Identity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'type_document' })
  typeDocument: number;

  @Column({ name: 'type_person' })
  typePerson: number;

  @Column()
  number: number;

  @Column()
  dv: number;

  @OneToOne(() => Contact, (contact) => contact.identity)
  contact: Contact;

  // auto columns
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
