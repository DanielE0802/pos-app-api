import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from '../company/company.module';
import { DefaultStrategy } from 'src/common/constants/app/jwt.app';
import { Stock } from '../../common/entities/stock';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { StockRepository } from 'src/common/repositories/stock.repository';

@Module({
  imports: [
    PassportModule.register(DefaultStrategy),
    TypeOrmModule.forFeature([Stock]),
    CompanyModule,
  ],
  controllers: [StockController],
  providers: [StockService, StockRepository],
  exports: [StockService],
})
export class StockModule {}
