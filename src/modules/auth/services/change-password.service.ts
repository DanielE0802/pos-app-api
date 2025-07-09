import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ChangePasswordDto } from '../dtos';
import { EncoderAdapter } from 'src/infrastructure/adapters';
import { UAE } from 'src/common/exceptions/exception.string';
import { UserRepository } from 'src/common/repositories';

@Injectable()
export class ChangePasswordService {
  private _logger = new Logger(ChangePasswordService.name);
  constructor(
    @Inject(UserRepository)
    private readonly _userRepo: UserRepository,
    private readonly _encoderAdapter: EncoderAdapter,
  ) {}

  async execute(
    authId: string,
    data: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const { oldPassword, newPassword } = data;

    const user = await this._userRepo.findOneByFilters({ authId });

    const validateOldPassword = await this._encoderAdapter.checkPassword(
      oldPassword,
      user.password,
    );

    if (!validateOldPassword) {
      this._logger.error(`Error en las credenciales: ${authId}`);
      throw new UnauthorizedException(UAE.UNAUTHORIZED);
    }

    user.password = await this._encoderAdapter.encodePassword(newPassword);
    await this._userRepo.save(user);

    this._logger.debug(`Contraseña actualizada exitosamente: ${authId}`);

    return {
      message: 'Password updated successfully',
    };
  }
}
