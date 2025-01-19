import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthServices } from './services';
import { DefaultStrategy } from 'src/common/constants/app/jwt.app';
import { EncoderAdapter } from 'src/infrastructure/adapters/encoder.adapter';
import { GenstrAdapter } from 'src/infrastructure/adapters/genstr.adapter';
import { JwtStrategy } from './jwt/jwt.strategy';
import { MailModule } from '../../common/modules/mail.module';
import { User } from '../../common/entities/user.entity';
import { UserRepository } from 'src/common/repositories';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    // ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register(DefaultStrategy),
    JwtModule.registerAsync({
      // TODO: Modificar las variables para obtenerlas del ConfigService
      useFactory: () => ({
        secret: 'my-secret', // TODO
        signOptions: {
          expiresIn: '1h', // TODO
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
