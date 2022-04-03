import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
// import { Request, Response } from 'express';
import { MongoError } from 'mongodb';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: MongoError, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    // const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const responseBody = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString(),
      error: exception,
    };
    httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
