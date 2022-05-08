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
import { ApiParam } from '@nestjs/swagger';
import { RegisterDto } from './dtos/register.dto';
import { IResponse } from './interfaces/response.interface';
import { AuthUserDto } from './dtos/auth-user.dto';
import { ResponseError, ResponseSuccess } from './dtos/response.dto';
import { LoginDto } from './dtos/login.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { AuthUser } from './auth.decorator';
import { EmailVerificationDto } from '../auth/dtos/email-verfication.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() regDTO: RegisterDto,
    @Body() EmailDTO: EmailVerificationDto,
  ): Promise<IResponse> {
    try {
      // const newUser = new AuthUserDto(await this.authService.register(regDTO));
      //

      // const sent = await this.authService.sendEmailVerificationToken(
      //   newUser.email,
      // );
      // console.log(await newUser);
      const newUser = await this.authService.register(regDTO);
      await this.authService.saveUserConsent(newUser.email);
      const emailToken = await this.authService.createEmailToken(
        newUser.email,
        EmailDTO,
      );
      if (newUser && emailToken) {
        // console.log(newUser);
        return new ResponseSuccess(
          'REGISTRATION.USER_REGISTERED_SUCCESSFULLY',
          { newUser, emailToken },
        );
      }
    } catch (error) {
      return error;
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

  //   @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDTO: LoginDto): Promise<any> {
    // console.log(loginDTO);
    try {
      return await this.authService.validateLogin(loginDTO);
    } catch (error) {
      console.log(error);
      return error;
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
          'VERIFICATION.VERIFIED_SUCCESSFULLY',
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

  /*  @Post('reset-request/:email')
  @ApiParam({
    name: 'email',
    type: 'String',
    example: 'ajayprajapat@live.com',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
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
  } */

  @Post('password-token')
  async createPasswordToken(
    @Body() resetPasswordDTO: ResetPasswordDto,
    @Param('email') email: string,
  ): Promise<any> {
    try {
      const createtoken = await this.authService.createForgottenPasswordToken(
        email,
        resetPasswordDTO,
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
    @Body() regDTO: RegisterDto,
    @Param('email') email: string,
    @Param('token') token: string,
  ): Promise<any> {
    try {
      const resetPassword = await this.authService.verifyPasswordToken(
        email,
        token,
        regDTO,
      );
      if (resetPassword) {
        return new ResponseSuccess(
          'RESET.VERIFIED_SUCCESSFULLY',
          resetPassword,
        );
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
