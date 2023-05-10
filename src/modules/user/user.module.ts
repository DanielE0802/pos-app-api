import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from 'src/common/config/jwt.config';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { UserProviders } from './providers/user.providers';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: JwtConfig.strategy }),
    TypeOrmModule.forFeature([User, Profile]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, ...UserProviders],
  exports: [UsersService, JwtStrategy, PassportModule],
})
export class UserModule {}
