import { ErrorMessage } from './../shared/@constants/error.constant';
import { Message } from './../shared/@constants/messages.constant';
import { LoginDto } from './@dtos/login.dto';
import { ResponseSuccess, ResponseError } from './../shared/@dtos/response.dto';
import { RegisterDto } from './@dtos/register.dto';
import { IResponse } from './../shared/@interfaces/response.interface';
import { Body, Controller, Param, Post, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<IResponse> {
    // const validUser = await this.authService.validateUser(registerDto.email);

    // if (validUser) {
      // return new ResponseError(
        // ErrorMessage.USER_ALREADY_EXISTS,
        // {},
        // HttpStatus.EXPECTATION_FAILED,
      // );
    // } else {
      // const registeredUser = await this.authService.register(registerDto);
      if (false) {
        return new ResponseSuccess(
          Message.REGISTERED_SUCCESSFULLY,
          {},
          HttpStatus.CREATED,
        );
      } else {
        return new ResponseError(
          ErrorMessage.REGISTER_NOT_SUCCESSFULLY,
          {},
        );
      }
    // }
  }

  @Get('send-email-token/:email')
  async sendEmailToken(@Param('email') email: string): Promise<IResponse> {
    const isSentEmailToken = await this.authService.sendEmailToken(email);
    if (isSentEmailToken) {
      return new ResponseSuccess(Message.SUCCESSFULLY_SENT_EMAIL_TOKEN, {});
    } else {
      return new ResponseError(
        ErrorMessage.LOGIN_NOT_SUCCESSFULLY_SENT_EMAIL_TOKEN,
        {},
      );
    }
  }

  @Get('verify-email-token/:email/:token')
  async verifyEmailToken(
    @Param('email') email: string,
    @Param('token') token: string,
  ): Promise<IResponse> {
    const isVerifiedEmailToken = await this.authService.verifyEmailToken(
      email,
      token,
    );
    if (isVerifiedEmailToken) {
      return new ResponseSuccess(Message.SUCCESSFULLY_VERIFIED_EMAIL_TOKEN, {});
    } else {
      return new ResponseError(
        ErrorMessage.LOGIN_NOT_SUCCESSFULLY_VERIFIED_EMAIL_TOKEN,
        {},
      );
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<IResponse> {
    const isVerifiedLoggedIn = await this.authService.validateLogin(loginDto);
    if (isVerifiedLoggedIn) {
      return new ResponseSuccess(
        Message.SUCCESSFULLY_LOGGED_IN,
        {},
        // HttpStatus.CREATED,
      );
    } else {
      return new ResponseError(
        ErrorMessage.LOGIN_NOT_SUCCESSFULLY_LOGGED_IN,
        {},
      );
    }
  }

  @Post('reset-request/:email')
  async resetRequest(@Param('email') email: string): Promise<IResponse> {
    const isResetRequest = await this.authService.resetRequest(email);
    if (isResetRequest) {
      return new ResponseSuccess(Message.SUCCESSFULLY_SENT_RESET_REQUEST, {});
    } else {
      return new ResponseError(
        ErrorMessage.LOGIN_NOT_SUCCESSFULLY_SENT_RESET_REQUEST,
        {},
      );
    }
  }

  @Post('forget-password/:token')
  async forgetPassword(
    email: string,
    token: string,
    password: string,
  ): Promise<IResponse> {
    const isChangedPassword = await this.authService.forgetPassword(
      email,
      token,
      password,
    );
    if (isChangedPassword) {
      return new ResponseSuccess(
        Message.LOGIN_SUCCESSFULLY_CHANGED_PASSWORD,
        {},
      );
    } else {
      return new ResponseError(
        ErrorMessage.LOGIN_NOT_SUCCESSFULLY_CHANGED_PASSWORD,
        {},
      );
    }
  }

  @Post('reset-password/:token')
  async resetPassword(
    email: string,
    oldPassword: string,
    password: string,
  ): Promise<IResponse> {
    const isResetPassword = await this.authService.resetPassword(
      email,
      oldPassword,
      password,
    );
    if (isResetPassword) {
      return new ResponseSuccess(
        Message.LOGIN_SUCCESSFULLY_CHANGED_PASSWORD,
        {},
      );
    } else {
      return new ResponseError(
        ErrorMessage.LOGIN_NOT_SUCCESSFULLY_CHANGED_PASSWORD,
        {},
      );
    }
  }

  @Post('logout')
  async logout(email: string): Promise<IResponse> {
    const isVerified = await this.authService.logout(email);
    if (isVerified) {
      return new ResponseSuccess(Message.SUCCESSFULLY_LOGGED_OUT, {});
    } else {
      return new ResponseError(
        ErrorMessage.LOGIN_NOT_SUCCESSFULLY_LOGGED_OUT,
        {},
      );
    }
  }
}
