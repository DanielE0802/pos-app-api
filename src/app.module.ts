import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbConfig } from './common/config/db.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

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
  ],
})
export class AppModule {}
