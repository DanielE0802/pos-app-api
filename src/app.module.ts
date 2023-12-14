import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbConfig } from './common/config/db.config';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { LocationModule } from './modules/location/location.module';
import { CompanyModule } from './modules/company/company.module';
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.dbClient,
      host: dbConfig.dbHost,
      port: dbConfig.dbPort,
      username: dbConfig.dbUser,
      password: dbConfig.dbPassword,
      database: dbConfig.dbName,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ContactsModule,
    ProductModule,
    LocationModule,
    CompanyModule,
  ],
})
export class AppModule {}
