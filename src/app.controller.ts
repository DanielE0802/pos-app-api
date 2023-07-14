import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { QueryBuilder } from 'typeorm/query-builder/QueryBuilder';

@Controller('app')
export class AppController {
  constructor() {}

  @Get('populate')
  async populate(queryRunner: QueryBuilder<any>) {
    try {
      console.log(queryRunner.connection);
    } catch (error) {
      return { error: 'Ocurrió un error al ejecutar las migraciones' };
    }
  }
}
