import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyServices } from './services/company';
import { DefaultStrategy } from '../../common/constants/app/jwt.app';
import { UserModule } from '../user/user.module';
import { CompanyControllers } from './controllers';
import { Product } from './entities/product.entity';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';


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
