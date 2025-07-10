import {
  createParamDecorator,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { IRelationType } from 'src/common/types/relation.decorator';

const _logger = new Logger('GetUserCompany - Decorator');

export const GetUserCompany = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();

    if (!user.id) {
      _logger.error(`Invalid token`, { user });
      throw new UnauthorizedException();
    }

    _logger.debug(`User request found: ${JSON.stringify(user)}`);
    return user.company as IRelationType;
  },
);
