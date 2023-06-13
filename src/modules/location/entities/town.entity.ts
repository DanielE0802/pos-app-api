import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Department } from './department.entity';
import { Pdv } from 'src/modules/pdv/entities/pdv.entity';

@Entity('towns')
export class Town {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Pdv, (pdv) => pdv.location)
  pdv: Pdv;

  @ManyToOne(() => Department, (department) => department.towns)
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
