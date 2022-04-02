import { ErrorCodes } from './../@constants/error-codes.constant';
// import { ErrorMessage } from './../@constants/error.constant';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  // HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    // const httpStatus =
    //   exception instanceof HttpException
    //     ? exception.getStatus()
    //     : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception.statusCode) {
      const responseBody = {
        statusCode: exception.statusCode,
        message: exception.message,
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        timestamp: new Date().toISOString(),
        error: exception.error,
      };
      httpAdapter.reply(ctx.getResponse(), responseBody, exception.statusCode);
    } else if (exception.response) {
      const responseBody = { ...exception.response };
      responseBody.path = httpAdapter.getRequestUrl(ctx.getRequest());
      responseBody.timestamp = new Date().toISOString();
      httpAdapter.reply(
        ctx.getResponse(),
        responseBody,
        exception.response.statusCode,
      );
    } else {
      if (
        typeof exception === 'object' &&
        exception.constructor.name === 'MongoServerError'
      ) {
        httpAdapter.reply(
          ctx.getResponse(),
          exception,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        if (ErrorCodes[exception]) {
          const responseBody = {
            statusCode: ErrorCodes[exception].statusCode,
            message: ErrorCodes[exception].message,
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            timestamp: new Date().toISOString(),
          };
          httpAdapter.reply(
            ctx.getResponse(),
            responseBody,
            ErrorCodes[exception].statusCode,
          );
        } else {
          httpAdapter.reply(
            ctx.getResponse(),
            {
              message: '" ' + exception + '" not configured in ErrorCodes',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }
  }
}
