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
import { JwtConfig } from 'src/common/config/jwt.config';
import { IJwtPayload } from './jwt/jwt-payload.interface';

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
    try {
      data.verifyToken = this.genstrService.generate(25);
      data.password = await this.encoderService.encodePassword(password);

      const user = await this.usersService.create(data);

      // Send ActivationEmail
      // await this.mailService.sendActivationEmail(user);

      return { msg: SUCC.SUCC_USER_REGISTERED };
    } catch (e) {
      throw new ConflictException((e as Error).message);
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.usersService.getUserByUsername(username);

    if (!user) throw new NotFoundException(NFE.NOT_USER);

    if (!(await this.encoderService.checkPassword(password, user.password)))
      throw new UnauthorizedException(UAE.UNAUTHORIZED);

    delete user.password;

    return this.jwtService.sign({ ...user });
  }

  async myAccount(user: User): Promise<any> {
    return user;
  }

  async verifyUser(data: ActivateUserDto): Promise<any> {
    try {
      const { uuid, code } = data;
      const user = await this.usersService.getInectiveUsersByCode(uuid, code);

      if (!user) throw new NotFoundException(UEE.USER_UNACTIVE);

      return (
        (await this.usersService.activateUser(user)) && {
          msg: SUCC.SUCC_USER_VERIFIED,
        }
      );
    } catch (error) {
      throw new UnprocessableEntityException(UEE.ENTITY_PROCESS);
    }
  }

  async reqResetPassword(data: ReqResetPasswordDto): Promise<any> {
    try {
      const user = await this.usersService.getUserByEmail(data.email);
      user.resetPasswordToken = this.genstrService.generate(50);

      const record = await this.usersService.update(user.id, user);

      return (
        (await this.mailService.sendResetPasswordEmail(record)) && {
          msg: SUCC.SUCC_RESET_CODE_SENT,
        }
      );
    } catch (e) {
      throw new ConflictException((e as Error).message);
    }
  }

  async resetPassword(data: ResetPasswordDto): Promise<any> {
    try {
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
    } catch (e) {
      throw new ConflictException((e as Error).message);
    }
  }

  async changePassword(data: ChangePasswordDto, user: User): Promise<void> {
    const { oldPassword, newPassword } = data;

    if (await this.encoderService.checkPassword(oldPassword, user.password)) {
      user.password = await this.encoderService.encodePassword(newPassword);
      await this.usersService.update(user.id, user);
    } else {
      throw new BadRequestException(BRE.NOT_CURRENT_PASSWORD);
    }
  }
}
