import {
  createParamDecorator,
  ExecutionContext,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IRelationType } from 'src/common/decorators/relation.decorator';

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();

  if (!user)
    throw new UnprocessableEntityException('Token does not contain a user');

  delete user.password;

  console.log(user)

  return user;
});

export const GetUserCompany = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();

    if (!user.profile.company)
      throw new UnprocessableEntityException('User has no companies assigned');

    console.log(user.profile.company)

    return user.profile.company as IRelationType;
  },
);
