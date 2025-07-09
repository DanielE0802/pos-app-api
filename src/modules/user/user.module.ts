import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { DefaultStrategy } from 'src/common/constants/app/jwt.app';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { User } from '../../common/entities/user.entity';
import { Profile } from '../../common/entities/profile.entity';
import { UserServices } from './services';

@Module({
  imports: [
    PassportModule.register(DefaultStrategy),
    TypeOrmModule.forFeature([User, Profile]),
  ],
  controllers: [UsersController],
  providers: [...UserServices, JwtStrategy],
  exports: [...UserServices],
})
export class UserModule {}
