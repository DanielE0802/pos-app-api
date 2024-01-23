import { JwtStrategy } from './jwt/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthProviders } from './providers/auth.providers';
import { MailModule } from '../mail/mail.module';
import { JwtConfig } from 'src/common/config/jwt.config';
import { EncoderService } from 'src/adapters/encoder.adapter';
import { GenstrService } from 'src/adapters/genstr.adapter';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: JwtConfig.strategy }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRED_TOKEN'),
        },
      }),
    }),
    MailModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    EncoderService,
    GenstrService,
    ...AuthProviders,
  ],
  exports: [TypeOrmModule, JwtModule, JwtStrategy, PassportModule],
})
export class AuthModule {}
