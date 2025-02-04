import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivateUserDto } from '../dtos';
import { User } from 'src/common/entities';

// TODO: Change logic to Email Verify

@Injectable()
export class VerifyUserService {
  private _logger = new Logger(VerifyUserService.name);
  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
  ) {}

  async execute(userId: string, data: ActivateUserDto): Promise<void> {
    const { code } = data;

    const userVerifying = await this._userRepo.findOneBy({
      authId: userId,
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
  }
}
