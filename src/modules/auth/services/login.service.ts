import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncoderAdapter } from 'src/infrastructure/adapters';
import { LoginDto } from '../dtos';
import { UAE } from 'src/common/exceptions/exception.string';

import { User } from 'src/common/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  private _logger = new Logger(LoginService.name);
  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
    private readonly _encoderAdapter: EncoderAdapter,
    private readonly _jwtService: JwtService,
  ) {}

  async execute(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    const userExists = await this._userRepo.findOneBy({ email });
    if (!userExists) {
      this._logger.error(`Usuario no encontrado con email: ${email}`);
      throw new NotFoundException({
        code: 100, // Handler custom code exceptions
        message: 'Usuario no encontrado',
      });
    }

    const passwordChecked = await this._encoderAdapter.checkPassword(
      password,
      userExists.password,
    );

    if (!passwordChecked) {
      this._logger.warn(
        `Falló en inicio de sesión del usuario: ${userExists.id}`,
      );
      throw new UnauthorizedException(UAE.UNAUTHORIZED);
    }

    if (!userExists.verified) {
      throw new UnauthorizedException(UAE.USER_UNVERIFY);
    }

    delete userExists.password;

    return {
      accessToken: this._jwtService.sign({
        id: userExists.id,
        email: userExists.email,
      }),
    };
  }
}
