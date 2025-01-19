import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IRelationType } from 'src/common/types/relation.decorator';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log(ctx);
    const { user } = ctx.switchToHttp().getRequest();

    if (!user)
      throw new InternalServerErrorException('User not found (request)');

    return !data ? user : user[data];
  },
);

// export const GetUser = createParamDecorator((_data, ctx: ExecutionContext) => {
//   const req = ctx.switchToHttp().getRequest();

//   if (!req.user)
//     throw new UnprocessableEntityException('Token does not contain a user');

//   delete req.user.password;

//   return req.user;
// });

// TODO: Revisar este decorador ya que es afectado por el cambio de la la relation de Profile.Company
export const GetUserCompany = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!req.user.company)
      throw new UnprocessableEntityException('User has no companies assigned');

    return req.user.company as IRelationType;
  },
);
