import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from '../entities/warehouse.entity';

export class WarehouseRepository extends Repository<Warehouse> {
  constructor(
    @InjectRepository(Warehouse)
    private readonly _repository: Repository<Warehouse>,
  ) {
    super(_repository.target, _repository.manager, _repository.queryRunner);
  }
}
