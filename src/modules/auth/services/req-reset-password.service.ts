import { Injectable, Logger, Inject, NotFoundException } from '@nestjs/common';
import { ReqResetPasswordDto } from '../dtos';
import { GenstrAdapter } from 'src/infrastructure/adapters';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ReqResetPasswordService {
  private _logger = new Logger(ReqResetPasswordService.name);
  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
    private readonly _genstrAdapter: GenstrAdapter,
  ) {}

  async execute(data: ReqResetPasswordDto): Promise<void> {
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
  }
}
