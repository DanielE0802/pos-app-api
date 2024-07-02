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
import { Pdv } from 'src/common/entities/pdv.entity';

@Entity('towns')
export class Town {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Pdv, (pdv) => pdv.location)
  pdv: Pdv[];

  @Column({ name: 'department_id', type: 'int', nullable: true })
  departmentId: number;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
