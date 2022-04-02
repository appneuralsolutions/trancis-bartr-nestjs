import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
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

    httpAdapter.reply(ctx.getResponse(), exception, 400);
  }
}
