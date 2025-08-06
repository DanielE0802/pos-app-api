import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities';

export class CompanyRepository extends Repository<Company> {
  constructor(
    @InjectRepository(Company)
    private readonly _repository: Repository<Company>,
  ) {
    super(_repository.target, _repository.manager, _repository.queryRunner);
  }
}
