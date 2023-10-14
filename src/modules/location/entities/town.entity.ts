import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Department } from './department.entity';
import { Pdv } from 'src/modules/pdv/entities/pdv.entity';

@Entity('towns')
export class Town {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Pdv, (pdv) => pdv.location)
  pdv: Pdv[];

  @ManyToOne(() => Department, (department) => department.towns)
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
