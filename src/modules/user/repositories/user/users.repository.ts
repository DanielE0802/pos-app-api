import { CreateUserDto } from '../../dto/user/create-user.dto';
import { User } from '../../entities/user.entity';

export interface UserRepository {
  /**
   * It saves the user to the database and returns the saved user
   * @param {CreateUserDto} createUserDto - CreateUserDto
   * @returns The user that was updated
   */
  create: (createUserDto: CreateUserDto) => Promise<User>;
  /**
   * It finds all the users in the database and returns them
   * @returns An array of User objects.
   */
  getUsers: () => Promise<User[]>;
  /**
   * It finds a user by their uuid and throws an error if it can't find one
   * @param {string} uuid - string - the uuid of the user we want to find
   * @returns A user object
   */
  getUser: (uuid: string) => Promise<User>;
  /**
   * Find all users where the active property is true.
   * @returns An array of users that are active.
   */
  getUsersOn: () => Promise<User[]>;
  /**
   * Find a user by their id and activation token, and make sure they're not active
   * @param {string} uid - The user's id
   * @param {string} code - The code that was sent to the user's email.
   * @returns User
   */
  getInectiveUsersByCode: (uid: string, code: string) => Promise<User>;
  /**
   * It finds a user by email and throws an error if it can't find one
   * @param {string} email - string - the email of the user we want to find
   * @returns A user object
   */
  getUserByEmail: (email: string) => Promise<User>;
  /**
   * Find a user by their reset password token
   * @param {string} resetPasswordToken - The token that was sent to the user's email address.
   * @returns A user object
   */
  getUserByResetPasswordToken: (resetPasswordToken: string) => Promise<User>;
  /**
   * Method which is responsible only for updating a user.
   * @param user This method receives as parameter the user to be updated
   */
  update: (id: string, data: any) => Promise<void>;
}

export const I_USER_REPOSITORY = 'UsersIRepository';
