import {
  createParamDecorator,
  ExecutionContext,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IRelationType } from 'src/common/types/relation.decorator';

const _logger = new Logger('GetUserCompany - Decorator');

export const GetUserCompany = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();

    if (!user.company) {
      _logger.error(`User request not found`);
      throw new UnprocessableEntityException('User has no companies assigned');
    }

    _logger.debug(`User request found: ${JSON.stringify(user, null, 2)}`);
    return user.company as IRelationType;
  },
);
