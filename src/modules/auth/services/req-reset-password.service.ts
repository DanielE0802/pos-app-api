import { Injectable, Logger, Inject, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReqResetPasswordDto } from '../dtos';
import { GenstrAdapter } from 'src/infrastructure/adapters';
import { User } from 'src/common/entities';
import { ReqResetPasswordEvent } from 'src/modules/mail/events';
import { EmailActionsEvent } from 'src/modules/mail/enums/email-events.enum';

@Injectable()
export class ReqResetPasswordService {
  private _logger = new Logger(ReqResetPasswordService.name);
  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
    private readonly _genstrAdapter: GenstrAdapter,
    private readonly _eventEmitter: EventEmitter2,
  ) {}

  async execute(data: ReqResetPasswordDto): Promise<void> {
    const { email } = data;

    const user = await this._userRepo.findOneBy({ email });
    if (!user) {
      this._logger.error(`Usuario no encontrado con el email: ${email}`);
      throw new NotFoundException({ acode: 2004 });
    }

    user.resetPasswordToken = this._genstrAdapter.generate(50);

    await this._userRepo.save(user);

    this._eventEmitter.emit(
      EmailActionsEvent.ReqResetPassword,
      new ReqResetPasswordEvent(user.email, user.profile.name),
    );

    // TODO: Implementar el envio del email (event?)
    // const emailSend = await this.mailService.sendResetPasswordEmail(record);
  }
}
