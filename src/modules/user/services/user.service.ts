import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from '../../../common/entities/user.entity';
import { NFE } from 'src/common/exceptions/exception.string';
import { RegisterUserDto } from '../../auth/dtos/register-user.dto';
import {
  I_USER_REPOSITORY,
  UserRepository,
} from '../repositories/user/users.repository';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(
    @Inject(I_USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  // TODO: Impl Profile custom Repository
  async create(data: RegisterUserDto): Promise<User> {
    try {
      return await this.userRepository.create(data);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error interno inesperado, revise los logs',
      );
    }
  }

  async findAll(pags: PaginationDto): Promise<User[]> {
    const { pageSize, page } = pags;
    try {
      const users = await this.userRepository.findAll({ pageSize, page });
      if (!users) this.handlerNotFound(`all`);

      return users;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error interno inesperado, revise los logs',
      );
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) this.handlerNotFound(id);

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error interno inesperado, revise los logs',
      );
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) this.handlerNotFound(email);

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error interno inesperado, revise los logs',
      );
    }
  }

  async findInectiveUsersByCode(id: string, code: string): Promise<User> {
    try {
      const user = await this.userRepository.findInectiveUsersByCode(id, code);
      if (!user) this.handlerNotFound(id);

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error interno inesperado, revise los logs',
      );
    }
  }

  async findByResetPasswordToken(resetPasswordToken: string) {
    try {
      const user = await this.userRepository.findByResetPasswordToken(
        resetPasswordToken,
      );

      if (!user) this.handlerNotFound(resetPasswordToken);

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error interno inesperado, revise los logs',
      );
    }
  }

  update = async (id: string, data: UpdateUserDto): Promise<User> => {
    console.log(id, { data });

    try {
      const userUpdated = await this.userRepository.update(id, data);
      if (!userUpdated)
        throw new UnprocessableEntityException(
          'Ocurrio un error actualizando el usuario',
        );

      return userUpdated;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error interno inesperado, revise los logs',
      );
    }
  };

  private handlerNotFound(by: string) {
    throw new NotFoundException(`${NFE.NOT_USER}:${by}`);
  }
}
