import { UseGuards, applyDecorators } from '@nestjs/common';
import { ValidRoles } from '../../../common/constants/app/valid-roles.app';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    // ApiBearerAuth(),
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
