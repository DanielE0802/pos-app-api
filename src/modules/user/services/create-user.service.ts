import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserRepository } from 'src/common/repositories';
import { RegisterUserDto } from 'src/modules/auth/dtos/register-user.dto';
import { MakeTransactional } from 'src/infrastructure/decorators/transactional.decorator';
import { Profile, User } from 'src/common/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CreateUserService {
  private _logger = new Logger(CreateUserService.name);
  constructor(
    @Inject(UserRepository)
    private readonly _userRepo: UserRepository,
    @InjectRepository(Profile)
    private readonly _profileRepo: Repository<Profile>,
  ) {}

  @MakeTransactional()
  async execute(data: RegisterUserDto): Promise<User> {
    const { profile, ...userData } = data;
    try {
      await this._userRepo.validateIfUserExist({
        email: data.email,
      });

      const profileCreated = await this._profileRepo.save(profile);
      const user = this._userRepo.create({
        ...userData,
        profile: profileCreated,
      });

      return await this._userRepo.save(user);
    } catch (error) {
      this._logger.error(error);
      throw new InternalServerErrorException(
        'Error interno inesperado, revise los logs',
      );
    }
  }
}
