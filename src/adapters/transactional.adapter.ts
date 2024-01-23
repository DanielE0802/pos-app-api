import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Injectable()
export class TypeormTransactional {
  constructor() {}

  create(options: DataSourceOptions) {
    return addTransactionalDataSource(new DataSource(options));
  }
}
