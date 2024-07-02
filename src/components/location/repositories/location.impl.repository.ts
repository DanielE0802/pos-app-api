import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '../entities/department.entity';
import { LocationRepository } from './location.repository';
import { Town } from '../entities/town.entity';

@Injectable()
export class LocationImplRepository implements LocationRepository {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
    @InjectRepository(Town)
    private readonly townRepo: Repository<Town>,
  ) {}

  find = async (rel: boolean): Promise<Department[]> =>
    await this.departmentRepo.find({ relations: { towns: rel } });

  findOne = async (id: string, rel: boolean): Promise<Department> =>
    await this.departmentRepo.findOne({
      where: { id },
      relations: { towns: rel },
    });
}
