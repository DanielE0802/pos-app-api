import { Module } from '@nestjs/common';
import { AuthModule } from './components/auth/auth.module';
import { CompanyModule } from './components/company/company.module';
import { ContactsModule } from './components/contacts/contacts.module';
import { CustomConfigModule } from './common/modules/config.module';
import { LocationModule } from './components/location/location.module';
import { ProductModule } from './components/product/product.module';
import { ServerStaticConfigModule } from './common/modules/server-static.module';
import { TypeORMModule } from './common/modules/typeorm.module';
import { StorageModule } from './common/modules/storage.module';
import { GraphqlConfigModule } from './common/modules/graphql.module';

@Module({
  imports: [
    TypeORMModule,
    GraphqlConfigModule,
    StorageModule,
    CustomConfigModule,
    ServerStaticConfigModule,

    AuthModule,
    ContactsModule,
    ProductModule,
    LocationModule,
    CompanyModule,
  ],
})
export class AppModule {}
