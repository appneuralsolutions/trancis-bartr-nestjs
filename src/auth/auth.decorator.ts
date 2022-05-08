import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtToken = request.headers.authorization
      ? (request.headers.authorization as string).split(' ')[1]
      : null;

    if (jwtToken) {
      return jwt.verify(jwtToken, 'secret');
    }
    return null;
  },
);
