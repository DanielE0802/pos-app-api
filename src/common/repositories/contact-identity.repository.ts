import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactIdentity } from '../entities';

export class ContactIdentityRepository extends Repository<ContactIdentity> {
  constructor(
    @InjectRepository(ContactIdentity)
    private readonly _repository: Repository<ContactIdentity>,
  ) {
    super(_repository.target, _repository.manager, _repository.queryRunner);
  }
}
