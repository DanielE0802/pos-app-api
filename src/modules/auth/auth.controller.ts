import {
  Body,
  ConflictException,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActivateUserDto } from './dto/activate-user.dto';
import { Auth } from './decorators';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from '../user/dto/user/create-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { LoginDto } from './dto/login.dto';
import { ReqResetPasswordDto } from './dto/req-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { User } from '../user/entities/user.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('/verifed')
  putActivateAccount(
    @Query() data: ActivateUserDto,
  ): Promise<Record<'msg', string>> {
    try {
      return this.authService.verifyUser(data);
    } catch (e) {
      throw new ConflictException((e as Error).message);
    }
  }

  @Patch('/req/reset-password')
  reqResetPassword(
    @Body() reqResetPasswordDto: ReqResetPasswordDto,
  ): Promise<Record<'msg', string>> {
    try {
      return this.authService.reqResetPassword(reqResetPasswordDto);
    } catch (e) {
      throw new ConflictException((e as Error).message);
    }
  }

  @Patch('/reset-password')
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<Record<'msg', string>> {
    try {
      return this.authService.resetPassword(resetPasswordDto);
    } catch (e) {
      throw new ConflictException((e as Error).message);
    }
  }

  @Patch('/change-password')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: any,
  ): Promise<void> {
    try {
      return this.authService.changePassword(changePasswordDto, user);
    } catch (e) {
      throw new ConflictException((e as Error).message);
    }
  }
}
