import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Town } from './town.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Town, (town) => town.department)
  towns: Town[];
}
