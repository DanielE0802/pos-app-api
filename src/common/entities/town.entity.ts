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
import { Warehouse } from 'src/common/entities/warehouse.entity';

@Entity('towns')
export class Town {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Warehouse, (pdv) => pdv.location)
  pdv: Warehouse[];

  @ManyToOne(() => Department, (department) => department.towns)
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
