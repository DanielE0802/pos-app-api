import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from 'src/modules/user/entities/user.entity';
import { UsersService } from 'src/modules/user/services/user.service';
import { JwtConfig } from 'src/common/constants/app/jwt.app';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      secretOrKey: JwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    const user = await this.usersService.findById(id);

    if (!user) throw new UnauthorizedException('Token not valid');
    if (!user.isActive) throw new UnauthorizedException('User is inactive');

    return user;
  }
}
