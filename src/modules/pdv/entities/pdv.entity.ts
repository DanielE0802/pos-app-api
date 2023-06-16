import { Company } from 'src/modules/company/entities/company.entity';
import { Town } from 'src/modules/location/entities/town.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pdvs')
export class Pdv {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @OneToOne(() => Town, (town) => town.pdv)
  @JoinColumn({ name: 'location_id' })
  location: Town;

  @Column({ length: 100, unique: true })
  address: string;

  @Column({ length: 100 })
  phone: string;

  @Column({ type: 'boolean' })
  main: boolean;

  @ManyToOne(() => Company, (company) => company.pdvs)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
