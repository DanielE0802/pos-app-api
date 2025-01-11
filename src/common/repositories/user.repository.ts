import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User) private readonly _repository: Repository<User>,
  ) {
    super(_repository.target, _repository.manager, _repository.queryRunner);
  }
}
