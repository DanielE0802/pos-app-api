import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyServices } from './services/company';
import { DefaultStrategy } from '../../common/constants/app/jwt.app';
import { UserModule } from '../user/user.module';
import { CompanyControllers } from './controllers';
import { Company, Product, Brand, Category } from 'src/common/entities';

@Module({
  imports: [
    PassportModule.register(DefaultStrategy),
    TypeOrmModule.forFeature([Company, Product, Brand, Category]),
    UserModule,
  ],
  controllers: [...Object.values(CompanyControllers)],
  providers: [...Object.values(CompanyServices)],
  exports: [CompanyServices.FindCompanyByCompanyIdService],
})
export class CompanyModule {}
