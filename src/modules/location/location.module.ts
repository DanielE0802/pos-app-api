import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department, Town } from 'src/common/entities';
import { DepartmentRepository } from 'src/common/repositories/location.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Town])],
  controllers: [LocationController],
  providers: [LocationService, DepartmentRepository],
  exports: [LocationService],
})
export class LocationModule {}
