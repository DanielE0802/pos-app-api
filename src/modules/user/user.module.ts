import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './services/user.service';
import { UsersController } from './controllers/user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from 'src/common/config/jwt.config';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { UserProviders } from './providers/user.providers';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: JwtConfig.strategy }),
    TypeOrmModule.forFeature([User, Profile]),
  ],
  controllers: [UsersController, ProfileController],
  providers: [UsersService, ProfileService, JwtStrategy, ...UserProviders],
  exports: [UsersService, ProfileService],
})
export class UserModule {}
