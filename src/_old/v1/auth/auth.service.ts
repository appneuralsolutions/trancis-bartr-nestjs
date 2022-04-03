import { EmailService } from './../../shared/email.service';
import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import * as bcrypt from 'bcryptjs';
import { default as config } from '../../config';
import { JwtService } from '@nestjs/jwt';
import { IConsentRegistry } from './interfaces/consent-registry.interface';
import { IEmailVerification } from './interfaces/email-verification.interface';
import { IForgottenPassword } from './interfaces/forgotten-password.interface';
import { IUserActivity } from './interfaces/user-activity.interface';
import {
  IUser,
  IUserEducation,
  IUserEmployeement,
  IUserMedical,
  IUserPersonal,
} from './interfaces/user.interface';
import { LoginDto } from './dtos/login.dto';
import { AuthUserDto } from './dtos/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Consent-Registry')
    private readonly consentRegistryModel: Model<IConsentRegistry>,
    @InjectModel('Email-Verification')
    private readonly emailVerificationModel: Model<IEmailVerification>,
    @InjectModel('Forgotten-Password')
    private readonly forgottenPasswordModel: Model<IForgottenPassword>,
    @InjectModel('User-Activity')
    private readonly userActivityModel: Model<IUserActivity>,
    @InjectModel('User-Personal')
    private readonly userPersonalModel: Model<IUserPersonal>,
    @InjectModel('User-Medical')
    private readonly userMedicalModel: Model<IUserMedical>,
    @InjectModel('User-Educational')
    private readonly userEducationalModel: Model<IUserEducation>,
    @InjectModel('User-Employment')
    private readonly userEmploymentModel: Model<IUserEmployeement>,
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  // guid(){
  //   function s4() {
  //     return Math.floor((1 + Math.random()) * 0x10000)
  //       .toString(16)
  //       .substring(1);
  //   }
  //   return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  // }

  isValidEmail(email: string) {
    if (email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    } else return false;
  }

  async validateLogin(loginDto: LoginDto): Promise<any> {
    // console.log(loginDto.username);
    const user: any = await this.userModel.findOne({
      email: loginDto.username,
    });

    if (!user) throw 'LOGIN.USER_NOT_FOUND';
    if (!user.auth.verification.email) throw 'LOGIN.EMAIL_NOT_VERIFIED';

    const isValidPass = await bcrypt.compare(loginDto.password, user.password);

    if (isValidPass) {
      //  console.log(user);
      const jwtToken = await this.signToken(user);
      user.jwtToken = await jwtToken;
      // console.log(user, jwtToken);
      // return await user;
      const resUser = new AuthUserDto(user);
      delete resUser['auth'];
      delete resUser['isActive'];
      delete resUser['jwtToken'];
      return resUser;
    } else {
      throw 'PASSWORD_ERROR';
    }
  }

  signToken(user: any): string {
    // console.log(user.fullName, 'USER');
    const payload = {
      userId: user.firstName,
      email: user.email,
      // roles: user.roles.map((r) => r.name),
    };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  async verifyPayload(payload: any): Promise<any> {
    let user: any;
    try {
      user = await this.userModel.findOne({ where: { email: payload.email } });
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.email}`,
      );
    }
    delete user.password;
    // console.log(user);

    return user;
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

  async createForgottenPasswordToken(
    email: string,
  ): Promise<IForgottenPassword> {
    const forgottenPassword = await this.forgottenPasswordModel.findOne({
      email: email,
    });
    if (
      forgottenPassword &&
      (new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 <
        15
    ) {
      throw new HttpException(
        'RESET_PASSWORD.EMAIL_SENDED_RECENTLY',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      const forgottenPasswordModel =
        await this.forgottenPasswordModel.findOneAndUpdate(
          { email: email },
          {
            email: email,
            newPasswordToken: (
              Math.floor(Math.random() * 9000000) + 1000000
            ).toString(), //Generate 7 digits number,
            timestamp: new Date(),
          },
          { upsert: true, new: true },
        );
      if (forgottenPasswordModel) {
        return forgottenPasswordModel;
      } else {
        throw new HttpException(
          'LOGIN.ERROR.GENERIC_ERROR',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getForgottenPasswordModel(
    newPasswordToken: string,
  ): Promise<IForgottenPassword> {
    return await this.forgottenPasswordModel.findOne({
      newPasswordToken: newPasswordToken,
    });
  }

  async sendEmailVerificationToken(email: string): Promise<boolean> {
    const model = await this.emailVerificationModel.findOne({ email: email });

    if (model && model.emailToken) {
      const mailOptions = {
        from: '"Company" <' + config.mail.user + '>',
        to: email, // list of receivers (separated by ,)
        subject: 'Verify Email',
        text: 'Verify Email',
        html:
          'Hi! <br><br> Thanks for your registration<br><br>' +
          'token is ' +
          model.emailToken +
          '<hr>',
        // +
        // '<a href=' +
        // config.domain +
        // '/auth/email/verify-token/' + email + '/'+
        // model.emailToken +
        // '>Click here to activate your account</a>', // html body
      };

      const sent = await this.emailService.sendEmail(mailOptions);
      console.log(sent, 'sent');
      console.log('Message sent: %s', sent.messageId);
      if (sent) return true;
      else return false;
    } else {
      throw 'REGISTER.USER_NOT_REGISTERED';
    }
  }

  async verifyEmailToken(email, token: string): Promise<boolean> {
    const emailVerif = await this.emailVerificationModel.findOne({
      email,
      emailToken: token,
    });
    console.log(email, token, emailVerif);
    if (emailVerif && emailVerif.email) {
      const userFromDb = await this.userModel.findOne({
        email: emailVerif.email,
      });
      if (userFromDb) {
        userFromDb.auth.verification.email = true;
        const savedUser = await userFromDb.save();
        await emailVerif.remove();
        return !!savedUser;
      }
    } else {
      throw 'VERIFICATION.EMAIL_CODE_NOT_VALID';
    }
  }

  async checkPassword(email: string, password: string) {
    const userFromDb = await this.userModel.findOne({ email });
    if (!userFromDb)
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    return await bcrypt.compare(password, userFromDb.password);
  }

  async resetRequest(email: string): Promise<boolean> {
    const userFromDb = await this.userModel.findOne({ email });
    if (!userFromDb) throw 'LOGIN.USER_NOT_FOUND';

    const tokenModel = await this.createForgottenPasswordToken(email);
    console.log(tokenModel);

    if (tokenModel && tokenModel.newPasswordToken) {
      const mailOptions = {
        from: '"Company" <' + config.mail.user + '>',
        to: email, // list of receivers (separated by ,)
        subject: 'Frogotten Password',
        text: 'Forgot Password',
        html:
          'Hi! <br><br> If you requested to reset your password<br><br>' +
          'Token is ' +
          tokenModel.newPasswordToken +
          '<hr>',
        // +
        // '<a href=' +
        // config.domain +
        // '/auth/email/reset-password/' + email +
        // tokenModel.newPasswordToken +
        // '>Click here</a>', // html body
      };

      const sent = await this.emailService.sendEmail(mailOptions);
      console.log(sent, 'sent');

      console.log('Message sent: %s', sent.messageId);
      if (sent) return true;
      else return false;
    } else {
      throw 'REGISTER.USER_NOT_REGISTERED';
    }
  }

  async register(newUser): Promise<any> {
    // newUser.uname = newUser.uname.toLowerCase().replace(/ /g, '');
    // console.log(newUser);
    if (this.isValidEmail(newUser.email) && newUser.password) {
      const userRegistered = await this.userModel
        .findOne({ email: newUser.email })
        .exec();
      // console.log(userRegistered);
      if (!userRegistered) {
        return await new this.userModel(newUser).save();
      } else if (!userRegistered.auth.validation.email) {
        throw 'USER.REGISTERED.EMAIL.NOT.VERIFIED';
      } else {
        throw 'REGISTRATION.USER_ALREADY_REGISTERED';
      }
    } else {
      throw 'REGISTRATION.MISSING_MANDATORY_PARAMETERS';
    }
  }

  async getUserDetails(_id): Promise<IUser> {
    return await this.userModel.findOne(_id);
  }

  async updateUser(email: string, updateUserDto) {
    return await this.userModel.findOneAndUpdate({ email }, updateUserDto);
  }

  // async verifyOTP(email, token) {
  //   return new Promise((resolve, reject) => {
  //     resolve(true);
  //   });
  // }

  async resetPassword(resetPasswordDTO) {
    const userFromDb = await this.userModel.findOne({
      email: resetPasswordDTO.email,
    });
    if (!userFromDb) throw 'LOGIN.USER_NOT_FOUND';
    userFromDb.password = resetPasswordDTO.password;
    return userFromDb.save();
  }

  async setPassword(resetPasswordDTO): Promise<boolean> {
    const userFromDb = await this.userModel.findOne({
      email: resetPasswordDTO.email,
    });
    if (!userFromDb) throw 'LOGIN.USER_NOT_FOUND';

    userFromDb.password = resetPasswordDTO.newPassword;
    userFromDb.save((result, err) => {
      console.log(result, err);
    });
    return true;
  }

  async logout(authUser) {
    return authUser;
    // return await this.userModel.find();
  }

  async updateProfile(profileDto): Promise<IUser> {
    const userFromDb = await this.userModel.findOne({
      email: profileDto.email,
    });
    // if(!userFromDb) throw new HttpException('COMMON.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    // if(profileDto.name) userFromDb.name = profileDto.name;
    // if(profileDto.surname) userFromDb.surname = profileDto.surname;
    // if(profileDto.phone) userFromDb.phone = profileDto.phone;
    // if(profileDto.birthdaydate) userFromDb.birthdaydate = profileDto.birthdaydate;

    // if(profileDto.profilepicture){
    //   let base64Data = profileDto.profilepicture.replace(/^data:image\/png;base64,/, "");
    //   let dir = "../public/users/"+ userFromDb.email;

    //   let success = await this.writeFile( dir, "profilepic.png", base64Data);
    //   if(success == true) {
    //     userFromDb.photos = userFromDb.photos || { profilePic : new PhotoDto(), gallery: []};
    //     userFromDb.photos.profilePic = userFromDb.photos.profilePic || new PhotoDto();
    //     userFromDb.photos.profilePic.date = new Date();
    //     userFromDb.photos.profilePic.url = "/public/users/" + userFromDb.email + "/profilepic.png"
    //   }
    // }

    await userFromDb.save();
    return userFromDb;
  }

  async updateGallery(galleryRequest): Promise<IUser> {
    const userFromDb = await this.userModel.findOne({
      email: galleryRequest.email,
    });
    // if(!userFromDb) throw new HttpException('COMMON.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    // let dir = "../public/users/" + userFromDb.email;
    // if(galleryRequest.newPhoto) try {galleryRequest.newPhoto = JSON.parse(<any>galleryRequest.newPhoto)} catch(e){}; //TODO: capire come mai dalla request arriva come stringa e bisogna parsarlo

    // if(galleryRequest.action){
    //   switch (galleryRequest.action) {
    //     case 'add':
    //       let base64Data = galleryRequest.newPhoto.imageData.replace(/^data:image\/png;base64,/, "");
    //       var newFileName = this.guid() + ".png";
    //       var success = await this.writeFile( dir, newFileName, base64Data);
    //       if(success == true) {
    //         let newPhoto = new PhotoDto(galleryRequest.newPhoto);
    //         newPhoto.date = new Date();
    //         newPhoto.url = "/public/users/" + userFromDb.email + "/" + newFileName;
    //         userFromDb.photos = userFromDb.photos || { profilePic : new PhotoDto(), gallery: []};
    //         userFromDb.photos.gallery.push(newPhoto)
    //       }
    //       break;
    //     case 'remove':
    //       var success = await this.removeFile( dir, galleryRequest.photoId);
    //       if(success) _.remove(userFromDb.photos.gallery, (photo) => { return photo.url.includes(galleryRequest.photoId)});
    //       userFromDb.markModified('photos');
    //       break;
    //     default:
    //       throw new HttpException('GALLERY.MISSING_ACTION', HttpStatus.NOT_FOUND);
    //   }
    // }

    return userFromDb.save();
  }

  async updateSettings(settingsDto): Promise<IUser> {
    const userFromDb = await this.userModel.findOne({
      email: settingsDto.email,
    });
    // if(!userFromDb) throw new HttpException('COMMON.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    // userFromDb.settings = userFromDb.settings || {};
    // for (var key in settingsDto) {
    //   if (settingsDto.hasOwnProperty(key) && key != "email") {
    //     userFromDb.settings[key] = settingsDto[key];
    //   }
    // }

    await userFromDb.save();
    return userFromDb;
  }
}