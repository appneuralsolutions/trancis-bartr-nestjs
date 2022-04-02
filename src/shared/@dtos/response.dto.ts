import { HttpStatus } from '@nestjs/common';
// success: true => message, data
// success: false => errorMessage, error
import { IResponse } from '../@interfaces/response.interface';
import { ErrorCodes } from './../@constants/error-codes.constant';

export class ResponseError implements IResponse {
  constructor(errorCode: string, error?: any) {
    this.statusCode = ErrorCodes[errorCode].statusCode | HttpStatus.BAD_REQUEST;
    this.success = false;
    this.message = ErrorCodes[errorCode].message;
    this.error = error;
    throw this;
    console.warn(
      new Date().toString() +
        ' - [Response]: ' +
        errorCode +
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
