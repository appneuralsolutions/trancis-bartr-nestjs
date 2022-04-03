import { AuthUser } from './@classes/auth-user.class';
import { RegisterDto } from './@dtos/register.dto';
// import { AuthUser } from './@entities/auth-user.entity';
import { IResponse } from './../shared/@interfaces/response.interface';
import { ErrorMessage } from './../shared/@constants/error.constant';
// import { ResponseError } from './../shared/@dtos/response.dto';
// import { AuthUserDto } from './@dtos/auth-user.dto';
// import { IRegister } from './@interfaces/register.interface';
import { ILogin } from './@interfaces/login.interface';
import {
  IAuthUser,
  IUserProfile,
  // , IUserProfile
} from './@interfaces/auth-user.interface';
import { IForgottenPassword } from './@interfaces/forgotten-password.interface';
import { IEmailVerification } from './@interfaces/email-verification.interface';
import { IConsentRegistry } from './@interfaces/consent-registry.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { NewUser } from './@interfaces/new-user.interface';
import { HttpService } from '@nestjs/axios';
import { MailerService } from '@nestjs-modules/mailer';
import { Model } from 'mongoose';
import { AuthUserDto } from './@dtos/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Consent-Registry')
    private readonly consentRegistryModel: Model<IConsentRegistry>,
    @InjectModel('Email-Verification')
    private readonly emailVerificationModel: Model<IEmailVerification>,
    @InjectModel('Forgotten-Password')
    private readonly forgottenPasswordModel: Model<IForgottenPassword>,
    @InjectModel('User') private readonly userModel: Model<IAuthUser>,
    @InjectModel('User-Profile')
    private readonly userProfileModel: Model<IAuthUser>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async creatUser(registerDto: RegisterDto): Promise<IAuthUser | Document> {
    return new Promise((resolve, reject) => {
      new this.userProfileModel({
        firstName: registerDto.firstName,
        middleName: registerDto.middleName,
        lastName: registerDto.lastName,
        mobileNo: registerDto.mobileNo,
        bio: registerDto.bio,
        gender: registerDto.gender,
        gallery: [],
        photo: '/profiles/registerDto.email',
        birthDate: registerDto.birthDate,
        nationality: 'Indian',
        maritalStatus: registerDto.maritalStatus,
      }).save((err, userProfile) => {
        if (err) return reject(err);
        new this.userModel({
          email: registerDto.email,
          phone: registerDto.mobileNo,
          password: registerDto.password,
          profile: userProfile._id,
        }).save((err, user) => {
          if (err) return reject(err);
          resolve(user);
        });
      });
    });
  }

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
    const user: IAuthUser = await this.userModel.findOne({
      email: userId,
      isActive: true,
      'auth.verification.email': true,
    });

    return user;
  }

  async validateLogin(loginDto: ILogin): Promise<NewUser | IResponse> {
    const validUser = await this.userModel.findOne({
      username: loginDto.username,
    });

    if (!validUser) {
      throw ErrorMessage.INTERNAL_SERVER_ERROR;
    }

    const isValidPass = await bcrypt.compare(
      loginDto.password,
      validUser.password,
    );

    if (isValidPass) {
      const jwt: any = await this.jwtService.signAsync({
        username: loginDto.username,
      });
      //   user.jwtToken = await jwtToken;
      return jwt;
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

  // async resetPassword(id: string, loginDto: ILogin): Promise<IUser> {
  //   // const salt = await bcrypt.genSalt();
  //   // loginDto.password = await bcrypt.hash(loginDto.password, salt);
  //   // return await this.userModel
  //   //   .findOneAndUpdate({ _id: id }, loginDto, {
  //   //     new: true,
  //   //   })
  //   //   .exec();
  // }

  async logout(email: string): Promise<boolean> {
    console.log(email);
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
