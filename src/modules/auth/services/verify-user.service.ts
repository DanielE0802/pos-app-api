import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/common/repositories';
import { ActivateUserDto } from '../dtos';
import { BaseResponse } from 'src/common/dtos';
import { UserVerifiedResponse } from '../dtos/user-verified-response.dto';

// TODO: Change logic to Email Verify

@Injectable()
export class VerifyUserService {
  private _logger = new Logger(VerifyUserService.name);
  constructor(
    @Inject(UserRepository)
    private readonly _userRepo: UserRepository,
  ) {}

  async execute(
    userId: string,
    data: ActivateUserDto,
  ): Promise<BaseResponse<UserVerifiedResponse>> {
    const { code } = data;

    const userVerifying = await this._userRepo.findOneBy({
      id: userId,
      verifyToken: code,
    });

    if (!userVerifying) {
      this._logger.warn(
        `No se encuentra un usuario para activar con el id: ${userId}`,
      );
      throw new NotFoundException({
        code: 101, // Handler custom code exceptions
        message: 'No se encuentra un usuario para activar',
      });
    }

    // TODO: Implementar estado de Onboarding "VERIFIED"
    userVerifying.verified = true;
    userVerifying.verifyToken = null;

    await this._userRepo.save(userVerifying);
    this._logger.debug(`Se verificó el usuario con el id: ${userId}`);

    return {
      message: 'Usuario activado correctamente',
      data: { id: userVerifying.id, email: userVerifying.email },
    };
  }
}
