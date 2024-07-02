import { Town } from 'src/components/location/entities/town.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Identity } from './identity.entity';
import { Company } from 'src/common/entities/company.entity';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 155 })
  name: string;

  @Column({ length: 155 })
  lastname: string;

  @Column({ length: 55 })
  email: string;

  @Column({ length: 155 })
  address: string;

  @Column({ length: 55, name: 'phone_number' })
  phoneNumber: string;

  @Column({ length: 55, name: 'phone_number2', default: null })
  phoneNumber2: string;

  @Column()
  type: number;

  // Relations
  @OneToOne(() => Identity, (identity) => identity.contact, { nullable: false })
  @JoinColumn({ name: 'identity_id' })
  identity: Identity;

  @Column({ name: 'company_id', type: 'varchar', nullable: true })
  companyId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ name: 'town_id', type: 'int', nullable: true })
  townId: number;

  @ManyToOne(() => Town)
  @JoinColumn({ name: 'town_id' })
  town: Town;

  // auto columns
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
