import { UserImplRepository } from '../repositories/users.impl.repository';
import { I_USER_REPOSITORY } from '../repositories/users.repository';

export const UserProviders = [
  {
    provide: I_USER_REPOSITORY,
    useClass: UserImplRepository,
  },
];
