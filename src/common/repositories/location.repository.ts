import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department, Town } from '../entities';

export class DepartmentRepository extends Repository<Department> {
  constructor(
    @InjectRepository(Department)
    private readonly _repository: Repository<Department>,
  ) {
    super(_repository.target, _repository.manager, _repository.queryRunner);
  }
}

export class TownRepository extends Repository<Town> {
  constructor(
    @InjectRepository(Town)
    private readonly _repository: Repository<Town>,
  ) {
    super(_repository.target, _repository.manager, _repository.queryRunner);
  }
}
