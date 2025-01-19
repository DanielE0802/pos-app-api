import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../entities';

export class ContactRepository extends Repository<Contact> {
  constructor(
    @InjectRepository(Contact)
    private readonly _repository: Repository<Contact>,
  ) {
    super(_repository.target, _repository.manager, _repository.queryRunner);
  }
}
