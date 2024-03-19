import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/company/company.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { CustomConfigModule } from './common/config/modules/config.module';
import { LocationModule } from './modules/location/location.module';
import { ProductModule } from './modules/product/product.module';
import { ServerStaticConfigModule } from './common/config/modules/server-static.module';
import { TypeORMModule } from './common/config/modules/typeorm.module';

const ConfigModules = [
  TypeORMModule,
  CustomConfigModule,
  ServerStaticConfigModule,
];

const AppModules = [
  AuthModule,
  ContactsModule,
  ProductModule,
  LocationModule,
  CompanyModule,
];

@Module({
  imports: [...ConfigModules, ...AppModules],
})
export class AppModule {}
