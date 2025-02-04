import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from '../dtos';
import { EncoderAdapter } from 'src/infrastructure/adapters';
import { UAE } from 'src/common/exceptions/exception.string';
import { User } from 'src/common/entities';

@Injectable()
export class ChangePasswordService {
  private _logger = new Logger(ChangePasswordService.name);
  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
    private readonly _encoderAdapter: EncoderAdapter,
  ) {}

  async execute(data: ChangePasswordDto, authId: string): Promise<void> {
    const { oldPassword, newPassword } = data;

    const user = await this._userRepo.findOne({
      select: { password: true },
      where: { authId },
    });
    if (!user) {
      this._logger.error(`Usuario no encontrado con el id: ${authId}`);
      throw new NotFoundException({ acode: 2004 });
    }

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
  }
}
