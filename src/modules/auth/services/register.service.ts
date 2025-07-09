import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EncoderAdapter, GenstrAdapter } from 'src/infrastructure/adapters';
import { RegisterUserDto } from '../dtos';
import { User } from 'src/common/entities';
import { EmailActionsEvent } from 'src/modules/mail/enums/email-events.enum';
import { ActivationLinkEvent } from 'src/modules/mail/events';
import { UserRepository } from 'src/common/repositories';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RegisterService {
  private _logger = new Logger(RegisterService.name);
  constructor(
    private readonly _configService: ConfigService,
    @Inject(UserRepository)
    private readonly _userRepo: UserRepository,
    private readonly _encoderAdapter: EncoderAdapter,
    private readonly _genstrAdapter: GenstrAdapter,
    private readonly _eventEmitter: EventEmitter2,
  ) {}

  async execute(data: RegisterUserDto): Promise<User> {
    const { email, password } = data;
    await this._userRepo.validateIfUserExist({ email });

    const hash = await this._encoderAdapter.encodePassword(password);
    const verifyToken = this._genstrAdapter.generate(25);

    const user = this._userRepo.create({
      ...data,
      password: hash,
      verifyToken,
    });

    // TODO: Implementar primer estado de Onboarding

    if (!user) {
      this._logger.error('Error intentando crear el usuario');
      throw new InternalServerErrorException(
        'Error intentando crear el usuario',
      );
    }

    const userRegistered = await this._userRepo.save(user);
    delete userRegistered.password;

    this._logger.debug(
      `${userRegistered.createdAt} -> Usuario ${userRegistered.email} registrado exitosamente`,
    );

    const url = `http://127.0.0.1:${this._configService.get(
      'port',
    )}/auth/activate-account?userId=${user.id}&code=${user.verifyToken}`;

    this._eventEmitter.emit(
      EmailActionsEvent.ActivationLink,
      new ActivationLinkEvent(user.email, user.profile.name, url),
    );

    return userRegistered;
  }
}
