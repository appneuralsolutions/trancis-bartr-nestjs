import { HttpException, HttpStatus } from '@nestjs/common';
// success: true => message, data
// success: false => errorMessage, error
import { IResponse } from '../@interfaces/response.interface';

export class ResponseError implements IResponse {
  constructor(infoMessage: string, error?: any, statusCode?: number) {
    this.statusCode = statusCode | HttpStatus.BAD_REQUEST;
    this.success = false;
    this.message = infoMessage;
    this.error = error;
    // throw this;
    console.warn(
      new Date().toString() +
        ' - [Response]: ' +
        infoMessage +
        (error ? ' - ' + JSON.stringify(error) : ''),
    );
  }
  statusCode: number;
  message: string;
  data: any[];
  error: any;
  success: boolean;
}

export class ResponseSuccess implements IResponse {
  constructor(
    infoMessage: string,
    data?: any,
    statusCode?: number,
    notLog?: boolean,
  ) {
    this.statusCode = statusCode | 200;
    this.success = true;
    this.message = infoMessage;
    this.data = data;
    if (!notLog) {
      try {
        const offuscateRequest = JSON.parse(JSON.stringify(data));
        if (offuscateRequest && offuscateRequest.token)
          offuscateRequest.token = '*******';
        console.log(
          new Date().toString() +
            ' - [Response]: ' +
            JSON.stringify(offuscateRequest),
        );
      } catch (error) {}
    }
  }
  statusCode: number;
  message: string;
  data: any[];
  error: any;
  success: boolean;
}
