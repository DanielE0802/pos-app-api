import { JwtStrategy } from './jwt/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthProviders } from './providers/auth.providers';
import { MailModule } from '../mail/mail.module';
import { JwtConfig } from 'src/common/config/jwt.config';
import { EncoderService } from 'src/utils/encoder.service';
import { GenstrService } from 'src/utils/genstr.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: JwtConfig.strategy }),
    JwtModule.register({
      secret: JwtConfig.secretKey,
      signOptions: {
        expiresIn: JwtConfig.tokenExpireIn,
      },
    }),
    MailModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    EncoderService,
    JwtStrategy,
    GenstrService,
    ...AuthProviders,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
