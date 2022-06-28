import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { ErrorMessage } from 'src/shared/@constants/error.constant';

export const Me = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtToken = request.headers.authorization
      ? (request.headers.authorization as string).split(' ')[1]
      : null;
    if (!jwtToken) throw ErrorMessage.UNAUTHORIZED_ACCESS;

    return jwtToken;
  },
);
