import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContactIdentity } from './identy.entity';
import { Town } from 'src/modules/location/entities/town.entity';
import { Company } from 'src/modules/company/entities/company.entity';

@Entity('contacts')
@Index(['email'])
export class Contact {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', length: 155 })
  name: string;

  @Column({ name: 'lastname', length: 155 })
  lastname: string;

  @Column({ name: 'email', length: 55 })
  email: string;

  @Column({ name: 'address', length: 155 })
  address: string;

  @Column({ name: 'phone_number', length: 55 })
  phoneNumber: string;

  @Column({ name: 'phone_number2', length: 55, default: null })
  phoneNumber2: string;

  @Column()
  type: number;

  @Column({ name: 'identity_id', type: 'int' })
  identityId: number;
  @OneToOne(() => ContactIdentity, (identity) => identity.contact, {
    nullable: false,
  })
  @JoinColumn({ name: 'identity_id' })
  identity: ContactIdentity;

  @Column({ name: 'company_id', type: 'int' })
  companyId: string;
  @ManyToOne(() => Company, (company) => company.user)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ name: 'town_id', type: 'int' })
  townId: number;
  @ManyToOne(() => Town, { nullable: true })
  @JoinColumn({ name: 'town_id' })
  town: Town;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
