import {
  BadRequestException,
  ConflictException,
  Injectable,
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
import { BRE, NFE, UAE, UEE } from 'src/common/exceptions/exception.string';
import { EncoderService } from 'src/utils/encoder.service';
import { GenstrService } from 'src/utils/genstr.service';
import { UsersService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly encoderService: EncoderService,
    private readonly jwtService: JwtService,
    private readonly genstrService: GenstrService,
    private readonly mailService: MailService,
  ) {}

  async register(data: CreateUserDto): Promise<any> {
    const { password } = data;

    data.verifyToken = this.genstrService.generate(25);
    data.password = await this.encoderService.encodePassword(password);

    const user = await this.usersService.create(data);

    // Send VerifyEmail
    await this.mailService.sendVerifyEmail(user);

    return { msg: SUCC.SUCC_USER_REGISTERED };
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;
    const user = await this.usersService.getUserByEmail(email);

    if (user && !user.verified)
      throw new UnauthorizedException(UEE.USER_UNVERIFY);

    if (!(await this.encoderService.checkPassword(password, user.password)))
      throw new UnauthorizedException(UAE.UNAUTHORIZED);

    delete user.password;

    return this.jwtService.sign({ ...user });
  }

  // TODO: Change logic to Email Verify
  async verifyUser(data: ActivateUserDto): Promise<any> {
    const { uuid, code } = data;
    const user = await this.usersService.getInectiveUsersByCode(uuid, code);

    if (!user) throw new NotFoundException(UEE.USER_UNVERIFY);

    user.verified = true;
    user.verifyToken = null;

    return (
      (await this.usersService.update(user.id, user)) && {
        msg: SUCC.SUCC_USER_VERIFIED,
      }
    );
  }

  async reqResetPassword(data: ReqResetPasswordDto): Promise<any> {
    const user = await this.usersService.getUserByEmail(data.email);
    user.resetPasswordToken = this.genstrService.generate(50);

    const record = await this.usersService.update(user.id, user);

    return (
      (await this.mailService.sendResetPasswordEmail(record)) && {
        msg: SUCC.SUCC_RESET_CODE_SENT,
      }
    );
  }

  async resetPassword(data: ResetPasswordDto): Promise<any> {
    const { resetPasswordToken, password } = data;

    const user = await this.usersService.getUserByResetPasswordToken(
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
}
