import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/guards/jwt-auth.guard';
import { UsersService } from './user.service';
import { User } from './entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get('on')
  getUsersOn(): Promise<User[]> {
    return this.usersService.getAllActiveUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Put()
  async update(@Query('id') id: string, data: any): Promise<void> {
    console.log(data);
    await this.usersService.update(id, data);
  }
}
