import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ReqResetPasswordDto } from './dto/req-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SUCC } from 'src/common/exceptions/success.string';
import { MailService } from '../mail/mail.service';
import { NFE, UAE, UEE } from 'src/common/exceptions/exception.string';
import { UsersService } from '../user/services/user.service';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/user/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { EncoderService } from 'src/common/helpers/encoder.adapter';
import { GenstrService } from 'src/common/helpers/genstr.adapter';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private readonly usersService: UsersService,
    private readonly encoderService: EncoderService,
    private readonly jwtService: JwtService,
    private readonly genstrService: GenstrService,
    private readonly mailService: MailService,
  ) {}

  async register(data: CreateUserDto): Promise<any> {
    const { password } = data;
    const hash = await this.encoderService.encodePassword(password);

    const user = await this.usersService.create({
      ...data,
      password: hash,
      verifyToken: this.genstrService.generate(25),
    });

    if (!user)
      throw new InternalServerErrorException(
        'Error intentando crear el usuario',
      );

    // TODO: Implementar y validar que se envio el email
    await this.mailService.sendVerifyEmail(user);

    return user;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);

    const passwordChecked = await this.encoderService.checkPassword(
      password,
      user.password,
    );

    if (!user || !passwordChecked)
      throw new UnauthorizedException(UAE.UNAUTHORIZED);

    if (!user.verified) throw new UnauthorizedException(UEE.USER_UNVERIFY);

    delete user.password;

    return { accessToken: this.jwtService.sign({ id: user.id }) };
  }

  async checkAuthStatus(user: User) {
    return { ...user, token: this.getJwtToken({ id: user.id }) };
  }

  // TODO: Change logic to Email Verify
  async verifyUser(data: ActivateUserDto): Promise<any> {
    const { id, code } = data;

    try {
      const user = await this.usersService.findInectiveUsersByCode(id, code);

      if (!user) throw new NotFoundException(UEE.USER_UNVERIFY);

      user.verified = true;
      user.verifyToken = null;

      const record = await this.usersService.update(user.id, user);
      return record && { msg: SUCC.SUCC_USER_VERIFIED };
    } catch (error) {
      console.log(error);
      console.log('Check logs - verifyUser');
    }
  }

  async reqResetPassword(data: ReqResetPasswordDto): Promise<any> {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) throw new NotFoundException(NFE.NOT_USER);

    user.resetPasswordToken = this.genstrService.generate(50);

    const record = await this.usersService.update(user.id, user);
    const emailSend = await this.mailService.sendResetPasswordEmail(record);

    return emailSend && { msg: SUCC.SUCC_RESET_CODE_SENT };
  }

  async resetPassword(data: ResetPasswordDto): Promise<any> {
    const { resetPasswordToken, password } = data;

    const user = await this.usersService.findByResetPasswordToken(
      resetPasswordToken,
    );

    if (!user) throw new NotFoundException(NFE.NOT_RESET_TOKEN);

    user.password = await this.encoderService.encodePassword(password);
    user.resetPasswordToken = null;

    return (
      (await this.usersService.update(user.id, user)) && {
        msg: SUCC.SUCC_PASS_UPDATED,
      }
    );
  }

  async changePassword(data: ChangePasswordDto, user: User): Promise<void> {
    const { oldPassword: op, newPassword: np } = data;

    if (!(await this.encoderService.checkPassword(op, user.password)))
      throw new UnauthorizedException(UAE.UNAUTHORIZED);

    user.password = await this.encoderService.encodePassword(np);
    await this.usersService.update(user.id, user);
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
