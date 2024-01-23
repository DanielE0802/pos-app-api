import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const RawHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const { rawHeaders } = ctx.switchToHttp().getRequest();
    return rawHeaders;
  },
);
