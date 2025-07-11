import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultStrategy } from '../../common/constants/app/jwt.app';
import { UserModule } from '../user/user.module';
import { CompanyControllers } from './controllers';
import { Company, Brand, Category } from 'src/common/entities';
import { CompanyProviders } from './services';

@Module({
  imports: [
    PassportModule.register(DefaultStrategy),
    TypeOrmModule.forFeature([Company, Brand, Category]),
    UserModule,
  ],
  controllers: [...Object.values(CompanyControllers)],
  providers: [...CompanyProviders],
  exports: [...CompanyProviders],
})
export class CompanyModule {}
