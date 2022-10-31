import { SingleValidationDto } from './@dtos/single.dto';
import { EmailService } from './../shared/email.service';
import { UpdateUserDto } from './../admin/users/dtos/update-user.dto';
import {
  Body,
  Controller,
  Post,
  Param,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './@dtos/register.dto';
import { IResponse } from './@interfaces/response.interface';
import { AuthUserDto } from './@dtos/auth-user.dto';
import { ResponseError, ResponseSuccess } from './@dtos/response.dto';
import { LoginDto } from './@dtos/login.dto';
import { ResetPasswordDto } from './@dtos/reset-password.dto';
import { AuthUser } from './auth.decorator';
import { Message } from 'src/shared/@constants/messages.constant';
import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { ForgotPasswordDto } from './@dtos/forgot-password.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {
    // emailService
    //   .sendEmail({
    //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //     to: 'ajay@appneural.com, nilofar@appneural.com, ajayprajapat@live.com', // list of receivers
    //     subject: 'Hello ✔', // Subject line
    //     text: 'Hello world?', // plain text body
    //     html: '<b>Hello world?</b>', // html body
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });
  }

  @Post('validate')
  async singlevalidation(@Body() singleValidationDto: SingleValidationDto) {
    const result: any = await this.authService.singlevalidation(
      singleValidationDto,
    );
    if (result) {
      return new ResponseSuccess(result, {});
    } else {
      return new ResponseError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() regDTO: RegisterDto): Promise<IResponse> {
    const newUser = await this.authService.register(regDTO);
    console.log(newUser);
    if (newUser) {
      await this.authService.saveUserConsent(newUser.email);
      await this.authService.createEmailToken(newUser.email);
      const emailToken = await this.authService.sendEmailVerification(
        newUser.email,
      );
      if (newUser && emailToken) {
        // console.log(newUser);
        return new ResponseSuccess(Message.REGISTERED_SUCCESSFULLY, {
          newUser,
          emailToken,
        });
      } else {
        return new ResponseError(ErrorMessage.REGISTER_NOT_SUCCESSFULLY);
      }
    } else {
      return new ResponseError(ErrorMessage.REGISTER_NOT_SUCCESSFULLY);
    }
  }

  @Post('send-token/:email')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'email',
    type: 'String',
    example: 'ajayprajapat@live.com',
    required: true,
  })
  async sendEmailVerificationToken(
    @Param('email') email: string,
  ): Promise<IResponse> {
    try {
      const sentMail = await this.authService.sendEmailVerification(email);
      if (sentMail) {
        return new ResponseSuccess(
          'VERIFICATION.SENT_EMAIL_VERIFICATION_TOKEN',
          sentMail,
        );
      } else {
        return new ResponseError('VERIFICATION.ERROR.MAIL_NOT_SENT');
      }
    } catch (error) {}
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDto): Promise<IResponse> {
    const data: any = await this.authService.validateLogin(loginDTO);
    const fcm = await this.authService.newFCMToken(data.user._id, loginDTO.fcmToken);
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_LOGGED_IN, data);
    } else {
      return new ResponseError(
        ErrorMessage.LOGIN_NOT_SUCCESSFULLY_LOGGED_IN,
        {},
      );
    }
  }

  @Post('verify-token/:email/:token')
  @ApiParam({
    name: 'email',
    type: 'String',
    example: 'ajayprajapat@live.com',
    required: true,
  })
  async verifyEmailToken(
    @Param('email') email: string,
    @Param('token') token: string,
  ): Promise<any> {
    try {
      const isVerified = await this.authService.verifyEmailToken(email, token);
      if (isVerified) {
        return new ResponseSuccess(
          Message.SUCCESSFULLY_VERIFIED_EMAIL_TOKEN,
          isVerified,
        );
      } else {
        return new ResponseError('VERIFICATION.NOT_VERIFIED_SUCCESSFULLY');
      }
    } catch (error) {
      return new ResponseError(error);
    }
  }

  // @Post('verify-otp')
  // async verifyOTP(
  //   @Param('mobile') mobile: string,
  //   @Param('token') token: string,
  // ): Promise<any> {
  //   try {
  //     return await this.authService.verifyOTP(mobile, token);
  //   } catch (error) {}
  // }

  @Post('reset-request/:email')
  @ApiParam({
    name: 'email',
    type: 'String',
    example: 'ajayprajapat@live.com',
    required: true,
  })
  async resetRequest(@Param('email') email: string): Promise<any> {
    try {
      const sentRequest = await this.authService.resetRequest(email);
      if (sentRequest) {
        return new ResponseSuccess('RESET.REQUEST_SENT_SUCCESSFULLY');
      } else {
        return new ResponseError('RESET.REQUEST_NOT_SENT_SUCCESSFULLY');
      }
    } catch (error) {
      return new ResponseError(error);
    }
  }

  @Post('password-token')
  async createPasswordToken(
    @Body() resetPasswordDTO: ResetPasswordDto,
    @Param('email') email: string,
  ): Promise<any> {
    try {
      const createtoken = await this.authService.createForgottenPasswordToken(
        email,
      );
      if (createtoken) {
        return new ResponseSuccess('RESET.VERIFIED_SUCCESSFULLY', createtoken);
      } else {
        return new ResponseError('RESET.NOT_VERIFIED_SUCCESSFULLY');
      }
    } catch (error) {
      return new ResponseError(error);
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    // @Param('email') email: string,
    // @Param('token') token: string,
  ): Promise<any> {
    try {
      const resetPassword = await this.authService.verifyPasswordToken(
        resetPasswordDto,
      );
      if (resetPassword) {
        return new ResponseSuccess('RESET.VERIFIED_SUCCESSFULLY', {});
      } else {
        return new ResponseError('RESET.NOT_VERIFIED_SUCCESSFULLY');
      }
    } catch (error) {
      return new ResponseError(error);
    }
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    // @Param('email') email: string,
    // @Param('token') token: string,
  ): Promise<any> {
    try {
      const forgotPassword = await this.authService.forgotPassword(
        forgotPasswordDto,
      );
      if (forgotPassword) {
        return new ResponseSuccess('RESET.VERIFIED_SUCCESSFULLY', {});
      } else {
        return new ResponseError('RESET.NOT_VERIFIED_SUCCESSFULLY');
      }
    } catch (error) {
      return new ResponseError(error);
    }
  }

  @Patch('edit-profile/:email')
  @HttpCode(HttpStatus.CREATED)
  async patchUser(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      if (updateUserDto.hasOwnProperty('password')) {
        // console.log('PASSWORD is changing');
        return new ResponseError('USER.PASSWORD_CANNOT_BE_CHANGED', {});
      } else if (updateUserDto.hasOwnProperty('email')) {
        // console.log('EMAIL is changing');
        return new ResponseError('USER.EMAIL_CANNOT_BE_CHANGED', {});
      } else if (updateUserDto.hasOwnProperty('phone')) {
        // console.log('EMAIL is changing');
        return new ResponseError('USER.PHONE_CANNOT_BE_CHANGED', {});
      } else {
        const updatedUser = await this.authService.updateUser(
          email,
          updateUserDto,
        );
        const userData = new AuthUserDto(updatedUser);
        delete userData['auth'];
        delete userData['isActive'];
        return new ResponseSuccess('USER.UPDATED_SUCCESSFULLY', userData);
      }
    } catch (error) {
      return new ResponseError('USER.NOT_UPDATED_SUCCESSFULLY');
    }
  }

  //   @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @AuthUser() authUser,
    // @Headers('authorization') authorization: any,
  ): Promise<any> {
    try {
      // const email = '';
      return await this.authService.logout(authUser);
    } catch (error) {}
    // console.log(this.jwtService.decode(authorization.replace('Bearer ', '')));
  }
}
