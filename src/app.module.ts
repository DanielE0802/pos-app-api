import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/company/company.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { CustomConfigModule } from './common/modules/config.module';
import { LocationModule } from './modules/location/location.module';
import { ProductModule } from './modules/product/product.module';
import { ServerStaticConfigModule } from './common/modules/server-static.module';
import { TypeORMModule } from './common/modules/typeorm.module';
import { StorageModule } from './common/modules/storage.module';

@Module({
  imports: [
    CustomConfigModule,
    TypeORMModule,
    // StorageModule,
    ServerStaticConfigModule,

    AuthModule,
    ContactsModule,
    ProductModule,
    LocationModule,
    CompanyModule,
  ],
})
export class AppModule {}
