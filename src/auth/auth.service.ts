import { AuthUser } from './@entities/auth-user.entity';
import { IResponse } from './../shared/@interfaces/response.interface';
import { ErrorMessage } from './../shared/@constants/error.constant';
import { ResponseError } from './../shared/@dtos/response.dto';
import { AuthUserDto } from './@dtos/auth-user.dto';
import { IRegister } from './@interfaces/register.interface';
import { ILogin } from './@interfaces/login.interface';
import { IAuthUser, IUserProfile } from './@interfaces/auth-user.interface';
import { IForgottenPassword } from './@interfaces/forgotten-password.interface';
import { IEmailVerification } from './@interfaces/email-verification.interface';
import { IConsentRegistry } from './@interfaces/consent-registry.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { HttpService } from '@nestjs/axios';
import { MailerService } from '@nestjs-modules/mailer';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Consent-Registry')
    private readonly consentRegistryModel: Model<IConsentRegistry>,
    @InjectModel('Email-Verification')
    private readonly emailVerificationModel: Model<IEmailVerification>,
    @InjectModel('Forgotten-Password')
    private readonly forgottenPasswordModel: Model<IForgottenPassword>,
    @InjectModel('User') private readonly userAuthModel: Model<IAuthUser>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async saveUserConsent(email: string): Promise<IConsentRegistry> {
    try {
      const http = new HttpService();

      const newConsent = new this.consentRegistryModel();
      newConsent.email = email;
      newConsent.date = new Date();
      newConsent.registrationForm = [
        'name',
        'surname',
        'email',
        'birthday date',
        'password',
      ];
      newConsent.checkboxText = 'I accept privacy policy';
      const privacyPolicyResponse: any = await http
        .get('https://www.XXXXXX.com/api/privacy-policy')
        .toPromise();
      newConsent.privacyPolicy = privacyPolicyResponse.data.content;
      const cookiePolicyResponse: any = await http
        .get('https://www.XXXXXX.com/api/privacy-policy')
        .toPromise();
      newConsent.cookiePolicy = cookiePolicyResponse.data.content;
      newConsent.acceptedPolicy = 'Y';
      return await newConsent.save();
    } catch (error) {
      console.error(error);
    }
  }

  signToken(user: any): string {
    const payload = {
      userId: user.firstName,
      email: user.email,
      roles: user.roles ? user.roles.map((r) => r.name) : [],
    };
    return this.jwtService.sign(payload);
  }

  async validateUser(userId: string): Promise<IAuthUser | null> {
    const user: IAuthUser = await this.userAuthModel.findOne({
      email: userId,
      isActive: true,
      'auth.verification.email': true,
    });

    return user;
  }

  async validateLogin(loginDto: ILogin): Promise<IAuthUser | IResponse> {
    const validUser = await this.validateUser(loginDto.username);

    return new AuthUserDto({});
    if (!validUser) {
      throw ErrorMessage.INTERNAL_SERVER_ERROR;
    }

    const isValidPass = await bcrypt.compare(
      loginDto.password,
      validUser.password,
    );

    if (isValidPass) {
      const jwtToken = this.signToken(validUser);
      //   user.jwtToken = await jwtToken;
      return new AuthUserDto(validUser);
    } else {
      throw 'PASSWORD_ERROR';
    }
  }

  async createEmailToken(email: string): Promise<boolean> {
    const emailVerification = await this.emailVerificationModel.findOne({
      email: email,
    });
    if (
      emailVerification &&
      (new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 <
        15
    ) {
      throw new HttpException(
        'LOGIN.EMAIL_SENDED_RECENTLY',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      await this.emailVerificationModel.findOneAndUpdate(
        { email: email },
        {
          email: email,
          emailToken: (
            Math.floor(Math.random() * 9000000) + 1000000
          ).toString(), //Generate 7 digits number
          timestamp: new Date(),
        },
        { upsert: true },
      );
      return true;
    }
  }

  async register(registerDto: IRegister): Promise<boolean> {
    // throw new ResponseError('asd', {}, HttpStatus.ACCEPTED);

    const splittedName = registerDto.fullName.split(' ');
    const profile: IUserProfile = {
      firstName: splittedName[0],
      middleName: '',
      lastName: splittedName[splittedName.length - 1],
      bio: '',
      gender: registerDto.gender,
      gallery: [],
      photo: '',
      birthDate: registerDto.dateOfBirth,
      nationality: null,
      maritalStatus: null,
      socialLinks: null,
    };
    // registerDto.profile = profile;
    // throw ErrorMessage.INTERNAL_SERVER_ERROR;

    const user = await new this.userAuthModel(registerDto).save();
    // throw 'xyz';

    return new Promise((resolve) => {
      if (user) {
        resolve(true);
      } else {
        resolve(true);
      }
    });
  }

  async sendEmailToken(email: string): Promise<boolean> {
    const model = await this.emailVerificationModel.findOne({ email });
    if (model && model.emailToken) {
      const mailOptions = {
        from: '"Company" <' + '' + '>',
        to: email, // list of receivers (separated by ,)
        subject: 'Verify Email',
        text: 'Verify Email',
        html:
          'Hi! <br><br> Thanks for your registration<br><br>' +
          'token is ' +
          model.emailToken +
          '<hr>',
      };

      const sent = await this.mailerService.sendMail(mailOptions);
      console.log(sent, 'sent');
      console.log('Message sent: %s', sent.messageId);
      return new Promise((resolve) => {
        if (sent) return resolve(true);
        else return resolve(false);
      });
    } else {
      throw 'REGISTER.USER_NOT_REGISTERED';
    }
  }

  async verifyEmailToken(email, token): Promise<boolean> {
    console.log(email, token);
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  async resetRequest(email: string): Promise<boolean> {
    console.log(email);
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  async forgetPassword(
    email: string,
    token: string,
    password: string,
  ): Promise<boolean> {
    console.log(email, token, password);
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  async resetPassword(
    email: string,
    oldPassword: string,
    password: string,
  ): Promise<boolean> {
    console.log(email, oldPassword, password);
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  async logout(email: string): Promise<boolean> {
    console.log(email);
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}