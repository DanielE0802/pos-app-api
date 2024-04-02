import { JwtStrategy } from './jwt/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthProviders } from './providers/auth.providers';
import { MailModule } from '../../common/modules/mail.module';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfig, DefaultStrategy } from 'src/common/constants/app/jwt.app';
import { EncoderService } from 'src/common/helpers/encoder.adapter';
import { GenstrService } from 'src/common/helpers/genstr.adapter';

@Module({
  imports: [
    // ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register(DefaultStrategy),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: JwtConfig.secret,
        signOptions: {
          expiresIn: JwtConfig.expiredToken,
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
  exports: [JwtModule, JwtStrategy, PassportModule],
})
export class AuthModule {}
