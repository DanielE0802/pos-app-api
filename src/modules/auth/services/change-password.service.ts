import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/common/repositories';
import { EncoderAdapter } from 'src/infrastructure/adapters';
import { ChangePasswordDto } from '../dtos';
import { BaseResponse } from 'src/common/dtos';
import { UAE } from 'src/common/exceptions/exception.string';
import { SUCC } from 'src/common/exceptions/success.string';

@Injectable()
export class ChangePasswordService {
  private _logger = new Logger(ChangePasswordService.name);
  constructor(
    @Inject(UserRepository)
    private readonly _userRepo: UserRepository,
    private readonly _encoderAdapter: EncoderAdapter,
  ) {}

  async execute(
    data: ChangePasswordDto,
    userId: string,
  ): Promise<BaseResponse> {
    const { oldPassword, newPassword } = data;

    const user = await this._userRepo.findOne({
      select: { password: true },
      where: { id: userId },
    });
    if (!user) {
      this._logger.error(`Usuario no encontrado con el id: ${userId}`);
      throw new NotFoundException({
        code: 104, // Handler custom code exceptions
        message: 'Usuario no encontrado',
      });
    }

    const validateOldPassword = await this._encoderAdapter.checkPassword(
      oldPassword,
      user.password,
    );

    if (!validateOldPassword) {
      this._logger.error(`Error en las credenciales: ${userId}`);
      throw new UnauthorizedException(UAE.UNAUTHORIZED);
    }

    user.password = await this._encoderAdapter.encodePassword(newPassword);
    await this._userRepo.save(user);

    this._logger.debug(`Contraseña actualizada exitosamente: ${userId}`);

    return { message: SUCC.SUCC_PASS_UPDATED };
  }
}
