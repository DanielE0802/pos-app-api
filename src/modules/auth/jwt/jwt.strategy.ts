import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from 'src/common/entities/user.entity';
import { UsersService } from 'src/modules/user/services/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    // TODO: Modificar las variables para obtenerlas del ConfigService
    super({
      secretOrKey: configService.get('jwt').secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    const user = await this.usersService.findById(+id);

    if (!user) throw new UnauthorizedException('Token not valid');
    // if (!user.isActive) throw new UnauthorizedException('User is inactive');

    return user;
  }
}
