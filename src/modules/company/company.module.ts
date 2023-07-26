import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyProviders } from './providers/company.providers';
import { PdvModule } from '../pdv/pdv.module';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from 'src/common/config/jwt.config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: JwtConfig.strategy }),
    TypeOrmModule.forFeature([Company]),
    PdvModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService, ...CompanyProviders],
  exports: [CompanyService],
})
export class CompanyModule {}
