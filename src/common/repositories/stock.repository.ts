import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from '../entities/stock';

export class StockRepository extends Repository<Stock> {
  constructor(
    @InjectRepository(Stock)
    private readonly _repository: Repository<Stock>,
  ) {
    super(_repository.target, _repository.manager, _repository.queryRunner);
  }
}
