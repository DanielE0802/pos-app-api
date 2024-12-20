import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyProviders } from './providers/company.providers';
import { PdvModule } from '../pdv/pdv.module';
import { PassportModule } from '@nestjs/passport';
import { DefaultStrategy } from 'src/common/constants/app/jwt.app';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register(DefaultStrategy),
    TypeOrmModule.forFeature([Company]),
    PdvModule,
    UserModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService, ...CompanyProviders],
  exports: [CompanyService],
})
export class CompanyModule {}
