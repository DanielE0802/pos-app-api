import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRelationType } from 'src/common/decorators/relation.decorator';

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();
  delete user.password;
  return user;
});

export const GetUserCompany = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    return user.profile.company as IRelationType;
  },
);
