import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncoderAdapter } from 'src/infrastructure/adapters';
import { LoginDto } from '../dtos';
import { UAE } from 'src/common/exceptions/exception.string';
import { UserRepository } from 'src/common/repositories';

@Injectable()
export class LoginService {
  private _logger = new Logger(LoginService.name);
  constructor(
    @Inject(UserRepository)
    private readonly _userRepo: UserRepository,
    private readonly _encoderAdapter: EncoderAdapter,
    private readonly _jwtService: JwtService,
  ) {}

  async execute(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    const userExists = await this._userRepo.findOneByFilters(
      { email },
      { company: true },
    );

    const passwordChecked = await this._encoderAdapter.checkPassword(
      password,
      userExists.password,
    );

    if (!passwordChecked) {
      this._logger.warn(`Falló en inicio de sesión: ${userExists.id}`);
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
        authId: userExists.authId,
      }),
    };
  }
}
