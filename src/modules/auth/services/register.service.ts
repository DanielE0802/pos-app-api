import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RegisterUserDto } from '../dtos';
import { UserRepository } from 'src/common/repositories';
import { EncoderAdapter, GenstrAdapter } from 'src/infrastructure/adapters';
import { BaseResponse } from 'src/common/dtos';
import { RegisterUserResponse } from '../dtos/register-user-response.dto';
import { MailService } from 'src/modules/mail/mail.service';

@Injectable()
export class RegisterService {
  private _logger = new Logger(RegisterService.name);
  constructor(
    @Inject(UserRepository)
    private readonly _userRepo: UserRepository,
    private readonly _encoderAdapter: EncoderAdapter,
    private readonly _genstrAdapter: GenstrAdapter,
    private readonly _emailSender: MailService,
  ) {}

  async execute(
    data: RegisterUserDto,
  ): Promise<BaseResponse<RegisterUserResponse>> {
    const { email, password } = data;

    const userExists = await this._userRepo.findOneBy({ email });
    if (userExists) {
      this._logger.error('Este email ya esta registrado');
      throw new UnprocessableEntityException({
        code: 100, // Handler custom code exceptions
        message: 'Este email ya esta registrado',
      });
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

    return {
      message: 'Usuario registrado exitosamente',
      data: { userId: userRegistered.authId, email: userRegistered.email },
    };
  }
}
