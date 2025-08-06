import { Inject, Injectable } from '@nestjs/common';
import { Department } from 'src/common/entities';
import { DepartmentRepository } from 'src/common/repositories/location.repository';

@Injectable()
export class LocationService {
  constructor(
    @Inject(DepartmentRepository)
    private readonly departmentRepo: DepartmentRepository,
  ) {}

  async findAll(): Promise<Department[]> {
    return await this.departmentRepo.find();
  }

  async findOne(id: number): Promise<Department> {
    return await this.departmentRepo.findOne({ where: { id } });
  }
}
