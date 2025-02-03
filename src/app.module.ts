import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/company/company.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { LocationModule } from './modules/location/location.module';
import { ProductModule } from './modules/product/product.module';
import { configuration, JoiValidationSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      // validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('db'),
      }),
      inject: [ConfigService],
      async dataSourceFactory(options) {
        if (!options) throw new Error('Invalid options passed');
        return addTransactionalDataSource(
          await new DataSource(options).initialize(),
        );
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '/public'),
    }),

    AuthModule,
    ContactsModule,
    ProductModule,
    LocationModule,
    CompanyModule,
  ],
})
export class AppModule {}
