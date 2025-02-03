import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncoderAdapter } from 'src/infrastructure/adapters';
import { LoginDto } from '../dtos';
import { UAE } from 'src/common/exceptions/exception.string';
import { UserRepository } from 'src/common/repositories';
import { BaseResponse } from 'src/common/dtos';

@Injectable()
export class LoginService {
  private _logger = new Logger(LoginService.name);
  constructor(
    @Inject(UserRepository)
    private readonly _userRepository: UserRepository,
    private readonly _encoderAdapter: EncoderAdapter,
    private readonly _jwtService: JwtService,
  ) {}

  async execute(
    loginDto: LoginDto,
  ): Promise<BaseResponse<{ accessToken: string }>> {
    throw new UnprocessableEntityException();

    const { email, password } = loginDto;

    const userExists = await this._userRepository.findOneBy({ email });
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
      data: {
        accessToken: this._jwtService.sign({
          id: userExists.id,
          email: userExists.email,
        }),
      },
    };
  }
}
