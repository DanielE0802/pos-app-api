import { Town } from 'src/modules/location/entities/town.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Identity } from './identy.entity';
import { Company } from 'src/modules/company/entities/company.entity';

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

  @OneToOne(() => Identity, (identity) => identity.contact, { nullable: false })
  @JoinColumn({ name: 'identity_id' })
  identity: Identity;

  @ManyToOne(() => Company, (company) => company.profiles)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Town, { nullable: true })
  @JoinColumn({ name: 'town_id' })
  town: Town;
}