import { ProfileImplRepository } from '../repositories/profile/profile.impl.repository';
import { I_PROFILE_REPOSITORY } from '../repositories/profile/profile.repository';
import { UserImplRepository } from '../repositories/user/users.impl.repository';
import { I_USER_REPOSITORY } from '../repositories/user/users.repository';

export const UserProviders = [
  {
    provide: I_USER_REPOSITORY,
    useClass: UserImplRepository,
  },
  {
    provide: I_PROFILE_REPOSITORY,
    useClass: ProfileImplRepository,
  },
];
