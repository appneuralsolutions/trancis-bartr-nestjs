import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    try {
      const request = context.switchToHttp().getRequest() as any;
      console.log('Before...');
      // const now = Date.now();
      // return next
      //   .handle()
      //   .pipe(
      //     tap(() => console.log(`After... ${Date.now() - now}ms`)),
      //   );
      return next.handle();
    } catch (error) {
      throw new UnauthorizedException('JWT Token Expired');
    }
  }
}
