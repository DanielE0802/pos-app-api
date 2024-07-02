import { applyDecorators } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

export function TransactionalAdapter() {
  return applyDecorators(Transactional());
}
