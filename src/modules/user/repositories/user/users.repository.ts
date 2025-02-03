import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { RegisterUserDto } from '../../../auth/dtos/register-user.dto';
import { UpdateUserDto } from '../../dto/user/update-user.dto';
import { User } from '../../../../common/entities/user.entity';

export interface UserRepository {
  /**
   * It saves the user to the database and returns the saved user
   * @param {RegisterUserDto} createUserDto - CreateUserDto
   * @returns The user that was updated
   */
  create: (createUserDto: RegisterUserDto) => Promise<User>;
  /**
   * It finds all the users in the database and returns them
   * @returns An array of User objects.
   */
  findAll: (pags: PaginationDto) => Promise<User[]>;
  /**
   * It finds a user by their uuid and throws an error if it can't find one
   * @param {string} id - string - the uuid of the user we want to find
   * @returns A user object
   */
  findById: (id: number) => Promise<User>;
  /**
   * Find a user by their id and activation token, and make sure they're not active
   * @param {string} id - The user's id
   * @param {string} code - The code that was sent to the user's email.
   * @returns User
   */
  findInectiveUsersByCode: (id: number, code: string) => Promise<User>;
  /**
   * It finds a user by email and throws an error if it can't find one
   * @param {string} email - string - the email of the user we want to find
   * @returns A user object
   */
  findByEmail: (email: string) => Promise<User>;
  /**
   * Find a user by their reset password token
   * @param {string} resetPasswordToken - The token that was sent to the user's email address.
   * @returns A user object
   */
  findByResetPasswordToken: (resetPasswordToken: string) => Promise<User>;
  /**
   * Method which is responsible only for updating a user.
   * @param user This method receives as parameter the user to be updated
   */
  update: (id: number, data: UpdateUserDto) => Promise<User>;
}

export const I_USER_REPOSITORY = 'UsersIRepository';
