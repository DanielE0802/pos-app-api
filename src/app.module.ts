import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbConfig } from './common/config/db.config';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { LocationModule } from './modules/location/location.module';
import { PdvModule } from './modules/pdv/pdv.module';
import { CompanyModule } from './modules/company/company.module';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from './common/config/jwt.config';
import { JwtStrategy } from './modules/auth/jwt/jwt.strategy';
import { UserProviders } from './modules/user/providers/user.providers';
import { UsersService } from './modules/user/services/user.service';
import { User } from './modules/user/entities/user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: JwtConfig.strategy }),
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
    ProductModule,
    LocationModule,
    CompanyModule,
  ],
})
export class AppModule {}
