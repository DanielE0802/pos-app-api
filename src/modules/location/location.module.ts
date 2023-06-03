import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Town } from './entities/town.entity';
import { LocationProviders } from './providers/location.providers';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Town])],
  controllers: [LocationController],
  providers: [LocationService, ...LocationProviders],
  exports: [LocationService],
})
export class LocationModule {}
