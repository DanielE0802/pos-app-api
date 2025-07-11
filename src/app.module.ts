import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { configuration } from './config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailModule } from './modules/mail/mail.module';
import { SharedModule } from './infrastructure/shared/shared.module';
import { LocationModule } from './modules/location/location.module';
import { CompanyModule } from './modules/company/company.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      // validationSchema: JoiValidationSchema,
    }),
    SharedModule,
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
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '/public'),
    }),
    AuthModule,
    MailModule,
    LocationModule,
    CompanyModule,
    WarehouseModule,
    // ContactsModule,
  ],
  // providers: [UserRepository],
  // exports: [UserRepository]
})
export class AppModule {}
