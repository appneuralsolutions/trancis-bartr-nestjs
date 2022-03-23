import { ErrorMessage } from './../../shared/@constants/error.constant';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const jwtToken = request.headers.authorization
      ? (request.headers.authorization as string).split(' ')[1]
      : null;
    if (!jwtToken) throw ErrorMessage.UNAUTHORIZED_ACCESS;
    return next.handle();
  }
}
