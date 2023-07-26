import {
  createParamDecorator,
  ExecutionContext,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IRelationType } from 'src/common/decorators/relation.decorator';

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  if (!req.user)
    throw new UnprocessableEntityException('Token does not contain a user');

  delete req.user.password;

  return req.user;
});

export const GetUserCompany = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!req.user.profile.company)
      throw new UnprocessableEntityException('User has no companies assigned');

    return req.user.profile.company as IRelationType;
  },
);
