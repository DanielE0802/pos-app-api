import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EncoderAdapter, GenstrAdapter } from 'src/infrastructure/adapters';
import { MailService } from 'src/modules/mail/mail.service';
import { RegisterUserDto } from '../dtos';
import { User } from 'src/common/entities';

@Injectable()
export class RegisterService {
  private _logger = new Logger(RegisterService.name);
  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
    private readonly _encoderAdapter: EncoderAdapter,
    private readonly _genstrAdapter: GenstrAdapter,
    private readonly _emailSender: MailService,
  ) {}

  async execute(data: RegisterUserDto): Promise<User> {
    const { email, password } = data;

    const userExists = await this._userRepo.findOneBy({ email });
    if (userExists) {
      this._logger.error('Este email ya esta registrado');
      throw new ConflictException({ acode: 2001 });
    }

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

    const url = `http://[::1]:3010//auth/activate-account?uid=${user.id}&code=${user.verifyToken}`;
    // TODO: Implementar el EVENT del email
    await this._emailSender.sendVerifyEmail(user.email, {
      name: user.profile.name,
      activationLink: url,
    });

    return userRegistered;
  }
}
