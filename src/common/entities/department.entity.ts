import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Town } from './town.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Town, (town) => town.department, { eager: true })
  towns: Town[];
}
