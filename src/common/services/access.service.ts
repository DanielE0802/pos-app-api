import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { ValidRoles } from '../constants/app/valid-roles.app';

@Injectable()
export class AccessService {
  canAccessAllAnswers(user: User): boolean {
    return [
      /** Add Access Roles */
    ].includes(user.roles);
  }

  canAccessOwnAnswers(user: User): boolean {
    return [
      /** Add Access Roles */
    ].includes(user.roles);
  }
}
