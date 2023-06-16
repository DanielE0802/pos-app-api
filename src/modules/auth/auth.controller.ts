import {
  Body,
  ConflictException,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ReqResetPasswordDto } from './dto/req-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GetUser } from './decorators/get-user.decarator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/user/create-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() data: CreateUserDto): Promise<any> {
    try {
      return this.authService.register(data);
    } catch (e) {
      throw new ConflictException((e as Error).message);
    }
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<string> {
    try {
      return this.authService.login(loginDto);
    } catch (e) {
      throw new ConflictException((e as Error).message);
    }
  }

  @Get('/verifed')
  @Redirect(`www.google.com.co`, 200)
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
