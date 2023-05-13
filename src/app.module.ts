import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbConfig } from './common/config/db.config';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { Category } from './modules/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.dbClient,
      host: dbConfig.dbHost,
      port: dbConfig.dbPort,
      username: dbConfig.dbUser,
      password: dbConfig.dbPassword,
      database: dbConfig.dbName,
      entities: [Category],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ProductModule,
  ],
})
export class AppModule {}
