import { Injectable, Logger, Inject, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/common/repositories';
import { EncoderAdapter, GenstrAdapter } from 'src/infrastructure/adapters';
import { ResetPasswordDto } from '../dtos';
import { BaseResponse } from 'src/common/dtos';
import { SUCC } from 'src/common/exceptions/success.string';

@Injectable()
export class ResetPasswordService {
  private _logger = new Logger(ResetPasswordService.name);
  constructor(
    @Inject(UserRepository)
    private readonly _userRepo: UserRepository,
    private readonly _encoderAdapter: EncoderAdapter,
  ) {}

  async execute(data: ResetPasswordDto): Promise<BaseResponse> {
    const { resetPasswordToken, password } = data;

    const user = await this._userRepo.findOneBy({ resetPasswordToken });
    if (!user) {
      this._logger.error(
        `Usuario no encontrado con el reset-token: ${resetPasswordToken}`,
      );
      throw new NotFoundException({
        code: 103, // Handler custom code exceptions
        message: 'Usuario no encontrado',
      });
    }

    let newPassword = await this._encoderAdapter.encodePassword(password);

    user.password = newPassword;
    user.resetPasswordToken = null;

    await this._userRepo.save(user);

    this._logger.debug(
      `Contraseña actualizada exitosamente para el usuario ${user.email}`,
    );

    return { message: SUCC.SUCC_PASS_UPDATED };
  }
}
