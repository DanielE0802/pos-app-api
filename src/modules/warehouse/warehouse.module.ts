import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { DefaultStrategy } from 'src/common/constants/app/jwt.app';
import { Warehouse } from '../../common/entities/warehouse.entity';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { WarehouseRepository } from 'src/common/repositories/warehouse.repository';

@Module({
  imports: [
    PassportModule.register(DefaultStrategy),
    TypeOrmModule.forFeature([Warehouse]),
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService, WarehouseRepository],
  exports: [WarehouseService],
})
export class WarehouseModule {}
