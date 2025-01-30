import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthServices } from './services';
import { DefaultStrategy } from 'src/common/constants/app/jwt.app';
import { EncoderAdapter } from 'src/infrastructure/adapters/encoder.adapter';
import { GenstrAdapter } from 'src/infrastructure/adapters/genstr.adapter';
import { JwtStrategy } from './jwt/jwt.strategy';
import { MailModule } from '../mail/mail.module';
import { User } from '../../common/entities/user.entity';
import { UserRepository } from 'src/common/repositories';
import { UserModule } from '../user/user.module';
import configuration from 'src/common/config/configuration';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    // ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register(DefaultStrategy),
    JwtModule.registerAsync({
      inject: [configuration.KEY],
      useFactory: async (config: ConfigType<typeof configuration>) => ({
        secret: config.SECRET,
        signOptions: {
          expiresIn: config.TOKEN_EXPIRE_IN,
        },
      }),
    }),
    MailModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    ...AuthServices,
    JwtStrategy,
    EncoderAdapter,
    GenstrAdapter,
    UserRepository,
  ],
  exports: [JwtModule, JwtStrategy, PassportModule],
})
export class AuthModule {}
