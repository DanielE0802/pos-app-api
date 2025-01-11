import { Injectable, Logger, Inject, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/common/repositories';
import { ReqResetPasswordDto } from '../dtos';
import { GenstrAdapter } from 'src/infrastructure/adapters';
import { BaseResponse } from 'src/common/dtos';
import { SUCC } from 'src/common/exceptions/success.string';

@Injectable()
export class ReqResetPasswordService {
  private _logger = new Logger(ReqResetPasswordService.name);
  constructor(
    @Inject(UserRepository)
    private readonly _userRepo: UserRepository,
    private readonly _genstrAdapter: GenstrAdapter,
  ) {}

  async execute(
    data: ReqResetPasswordDto,
  ): Promise<BaseResponse<{ msg: string }>> {
    const { email } = data;

    const user = await this._userRepo.findOneBy({ email });
    if (!user) {
      this._logger.error(`Usuario no encontrado con el email: ${email}`);
      throw new NotFoundException({
        code: 100, // Handler custom code exceptions
        message: 'Usuario no encontrado',
      });
    }

    user.resetPasswordToken = this._genstrAdapter.generate(50);

    await this._userRepo.save(user);

    // TODO: Implementar el envio del email (event?)
    // const emailSend = await this.mailService.sendResetPasswordEmail(record);

    return { message: SUCC.SUCC_RESET_CODE_SENT };
  }
}
