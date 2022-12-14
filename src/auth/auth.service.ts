import { ResetPasswordDto } from './@dtos/reset-password.dto';
import { EmailService } from '../shared/email.service';
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
import { JwtService } from '@nestjs/jwt';
import { IConsentRegistry } from './@interfaces/consent-registry.interface';
import { IEmailVerification } from './@interfaces/email-verification.interface';
import { IForgottenPassword } from './@interfaces/forgotten-password.interface';
import { IUserActivity } from './@interfaces/user-activity.interface';
import * as nodemailer from 'nodemailer';
import {
  IUser,
  IUserEducation,
  IUserEmployeement,
  IUserMedical,
  IUserPersonal,
} from './@interfaces/user.interface';
import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { ForgotPasswordDto } from './@dtos/forgot-password.dto';

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
    @InjectModel('FCM') private readonly FCMModel: Model<any>,
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

  async singlevalidation(SingleValidationDto) {
    if (SingleValidationDto.email) {
      const email = await this.userModel.findOne({
        email: SingleValidationDto.email,
      });
      if (email) throw ErrorMessage.EMAIL_ALREADY_EXISTS;
    }
    if (SingleValidationDto.username) {
      const username = await this.userModel.findOne({
        uname: SingleValidationDto.username,
      });
      if (username) throw ErrorMessage.UNAME_ALREADY_EXISTS;
    }
    if (SingleValidationDto.phone) {
      const phone = await this.userModel.findOne({
        phone: SingleValidationDto.phone,
      });
      if (phone) throw ErrorMessage.MOBILENO_ALREADY_EXISTS;
    }
    return new Promise((resolve) => {
      return resolve('not exists');
    });
  }

  isValidEmail(email: string) {
    if (email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    } else return false;
  }

  async validateUser(email): Promise<any> {
    const user: any = await this.userModel.findOne({
      email,
    });
    if (user && user.length > 0) {
      return true;
    } else false;
  }

  async validateLogin(loginDto): Promise<any> {
    if (loginDto.email && loginDto.password) {
      const isValidEmail = this.isValidEmail(loginDto.email);
      if (isValidEmail) {
        const user: any = await this.userModel.findOne({
          email: loginDto.email,
        });
        if (!user) throw ErrorMessage.USER_NOT_FOUND;

        if (user && !user.auth.verification.email && !user.isSocial) {
          throw ErrorMessage.VERIFY_LOGIN_EMAIL_TOKEN_FIRST;
        }
        // if (!user.auth.verification.email) throw 'LOGIN.EMAIL_NOT_VERIFIED';

        const isValidPass = await bcrypt.compare(
          loginDto.password,
          user.password,
        );
        if (isValidPass) {
          const jwtToken = await this.signToken(user);
          console.log(user.jwtToken);
          // console.log(user, jwtToken);
          // return await user;
          // const resUser = new AuthUserDto(user);
          // delete resUser['auth'];
          // delete resUser['isActive'];
          // delete resUser['jwtToken'];
          // return resUser;
          const newUser: any = { ...user._doc };
          delete newUser.auth;
          return {
            user: newUser,
            jwtToken,
          };
        } else {
          //check email empty or password empty
          throw ErrorMessage.LOGIN_WRONG_USERNAME_OR_PASSWORD;
          // throw 'Incorrect Email address or Password';
        }
      } else {
        throw 'Not Valid Email';
      }
    }
    //  else {

    //   if((!loginDto.email)&&(!loginDto.password)){
    //     throw 'Email or Password Not Valid'
    //   }else{
    //     if(loginDto.email){
    //       const isValidEmail = this.isValidEmail(loginDto.email);
    //       if(!isValidEmail){
    //         throw 'Invalid Email'
    //       }

    //     }else{
    //       throw 'Invalid Email'
    //     }

    //     if(!loginDto.password){
    //       throw 'Invalid Password'
    //     }
    //   }

    //   // throw 'Email or Password Not Valid'

    // }

    // console.log(loginDto.username);
  }

  signToken(user: any): string {
    // console.log(user.fullName, 'USER');
    const payload = {
      userId: user._id,
      email: user.email,
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
      throw ErrorMessage.EMAIL_TOKEN_SENT_RECENTLY;
    }
    if (
      emailVerification &&
      (new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 >
        15
    ) {
      await this.emailVerificationModel.findOneAndUpdate(
        { email: email },
        {
          emailToken: (
            Math.floor(Math.random() * 9000000) + 1000000
          ).toString(), //Generate 7 digits number,
          timestamp: new Date(),
        },
        { upsert: true, new: true },
      );
    } else {
      const emailVerificationModel = {
        email,
        emailToken: (Math.floor(Math.random() * 9000000) + 1000000).toString(),
        timestamp: new Date(),
      };
      await new this.emailVerificationModel(emailVerificationModel).save();

      return true;
    }
  }

  async createForgottenPasswordToken(email: string): Promise<any> {
    const forgottenPassword = await this.forgottenPasswordModel.findOne({
      email,
    });
    // if (
    //   forgottenPassword &&
    //   (new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 <
    //     15
    // ) {
    //   throw ErrorMessage.EMAIL_TOKEN_SENT_RECENTLY;
    // }
    if (
      forgottenPassword &&
      (new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 >
        15
    ) {
      return await this.forgottenPasswordModel.findOneAndUpdate(
        { email },
        {
          $set: {
            newPasswordToken: (
              Math.floor(Math.random() * 9000000) + 1000000
            ).toString(), //Generate 7 digits number,
            timestamp: new Date(),
          },
        },
        { upsert: true, new: true },
      );
    } else {
      const resetPassword = {
        email,
        newPasswordToken: (
          Math.floor(Math.random() * 9000000) + 1000000
        ).toString(),
        timestamp: new Date(),
      };

      return await new this.forgottenPasswordModel(resetPassword).save();
    }
  }

  async getForgottenPasswordModel(
    newPasswordToken: string,
  ): Promise<IForgottenPassword> {
    return await this.forgottenPasswordModel.findOne({
      newPasswordToken: newPasswordToken,
    });
  }

  async sendPasswordToken(email: string): Promise<any> {
    const model = await this.forgottenPasswordModel.findOne({ email: email });
    if (model) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kailash@appneural.com',
          pass: '9549230227@Appneural',
        },
      });
      const options = {
        from: 'kailash@appneural.com',
        to: model.email,
        subject: 'Email verifaction code',
        text: model.newPasswordToken,
      };
      transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log(err);
          return err;
        } else {
          console.log(info.response);
          return info.response;
        }
      });
    }
  }

  async sendEmailVerification(email: string): Promise<boolean> {
    const model = await this.emailVerificationModel.findOne({ email });

    if (model && model.emailToken) {
      const mailOptions = {
        from: '"" <' + 'Bartr' + '>',
        to: email + ', admin@appneural.com', // list of receivers (separated by ,)
        subject: ' Please Verify Email',
        text: ' Please Verify Email',
        html:
          // 'Hi! <br><br> Thanks for your registration<br><br>' +
          // 'token is ' +
          // model.emailToken +
          // '<hr>' +
          // '<a href=' +
          // 'localhost:3003' +
          // '/auth/email/verify-token/' +
          // email +
          // '/' +
          // model.emailToken +
          // '>Click here to activate your account</a>',
          'Your verification code is (' +
          model.emailToken +
          ').' +
          'Thanks,' +
          'Bartr',
      };

      let sent: any = await this.emailService.sendEmail(mailOptions);
      console.log(sent, 'sent');
      // sent = await this.emailService.sendSendGridEmail(mailOptions);
      console.log(sent, 'sent');
      // console.log('Message sent: %s', sent.messageId);
      if (sent) return true;
      else return false;
    } else {
      throw ErrorMessage.REGISTER_NOT_SUCCESSFULLY;
    }
  }

  /* async sendEmailVerification(email: string): Promise<boolean> {   
    var model = await this.emailVerificationModel.findOne({ email: email});

    if(model && model.emailToken){
        let transporter = nodemailer.createTransport({
            host: config.mail.host,
            port: config.mail.port,
            secure: config.mail.secure, // true for 465, false for other ports
            auth: {
                user: config.mail.user,
                pass: config.mail.pass
            }
        });
    
        var mailOptions = {
          from: '"Company" <' + config.mail.user + '>', 
          to: email, // list of receivers (separated by ,)
          subject: 'Verify Email', 
          text: 'Verify Email', 
          html: 'Hi! <br><br> Thanks for your registration<br><br>'+
          '<a href='+ config.host.url + ':' + config.host.port +'/auth/email/verify/'+ model.emailToken + '>Click here to activate your account</a>'  // html body
        };
    
        var sent = await new Promise<boolean>(async function(resolve, reject) {
          return await transporter.sendMail(mailOptions, async (error, info) => {
              if (error) {      
                console.log('Message sent: %s', error);
                return reject(false);
              }
              console.log('Message sent: %s', info.messageId);
              resolve(true);
          });      
        })

        return sent;
    } else {
      throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
    }
  } */

  async verifyEmailToken(email, token: string): Promise<any> {
    const emailVerif = await this.emailVerificationModel.findOne({
      email: email,
    });
    if (emailVerif.emailToken === token) {
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

  async verifyPasswordToken(resetPasswordDto: ResetPasswordDto): Promise<any> {
    const passwordVerif = await this.forgottenPasswordModel.findOne({
      email: resetPasswordDto.email,
    });
    if (passwordVerif.newPasswordToken === resetPasswordDto.token) {
      const userFromDb = await this.userModel.findOne({
        email: passwordVerif.email,
      });

      // await bcrypt.compare(password, userFromDb.password);
      // let hasPassword;
      // bcrypt.genSalt(10, function (err, salt) {
      //   if (err) return '';

      //   // hash the password using our new salt
      //   bcrypt.hash(resetPasswordDto.password, salt, async (err, hash) => {
      //     if (err) return '';
      //     // override the cleartext password with the hashed one
      //     hasPassword = hash;
      //     if (userFromDb) {

      //       // await passwordVerif.remove();
      //       return !!savedUser;
      //     }
      //   });
      // });
      await passwordVerif.remove();

      userFromDb.auth.verification.email = true;
      userFromDb.password = resetPasswordDto.password;
      const savedUser = await userFromDb.save();
      return savedUser;
    } else {
      throw ErrorMessage.EMAIL_NOT_SENT;
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
    const user: any = await this.userModel.findOne({
      email: forgotPasswordDto.email,
    });
    if (!user) throw ErrorMessage.VERIFY_LOGIN_EMAIL_TOKEN_FIRST;

    const isValidPass = await bcrypt.compare(
      forgotPasswordDto.oldPassword,
      user.password,
    );
    if (isValidPass) {
      user.password = forgotPasswordDto.password;
      user.save();

      // await bcrypt.compare(password, userFromDb.password);
      // let hasPassword;
      // bcrypt.genSalt(10, function (err, salt) {
      //   if (err) return '';

      //   // hash the password using our new salt
      //   bcrypt.hash(resetPasswordDto.password, salt, async (err, hash) => {
      //     if (err) return '';
      //     // override the cleartext password with the hashed one
      //     hasPassword = hash;
      //     if (userFromDb) {

      //       // await passwordVerif.remove();
      //       return !!savedUser;
      //     }
      //   });
      // });
      return user;
    } else {
      throw ErrorMessage.EMAIL_NOT_SENT;
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
    if (!userFromDb) throw ErrorMessage.USER_NOT_FOUND;

    const tokenModel: any = await this.createForgottenPasswordToken(email);

    if (tokenModel && tokenModel.newPasswordToken) {
      const mailOptions = {
        from: '"Company" <' + 'Bartr' + '>',
        to: email, // list of receivers (separated by ,)
        subject: 'Forgotten Password',
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

      let sent: any = await this.emailService.sendEmail(mailOptions);
      console.log('Message sent: %s', sent.messageId);
      // sent = await this.emailService.sendSendGridEmail(mailOptions);
      console.log('Message sent: %s', sent.messageId);
      if (sent) return true;
      else return false;
    } else {
      throw ErrorMessage.EMAIL_NOT_SENT;
    }
  }

  async register(newUser): Promise<any> {
    newUser.uname = newUser.uname.toLowerCase().replace(/ /g, '');
    const profile_pic = 'No Profile';
    newUser.picture = profile_pic;
    // console.log(newUser);
    const userRegistered = await this.userModel
      .findOne({ email: newUser.email })
      .exec();

    if (!userRegistered) {
      return await new this.userModel(newUser).save();
      this.createEmailToken(newUser.email);
    } else {
      throw ErrorMessage.USER_ALREADY_EXISTS;
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

  async newFCMToken(userId: string, fcmToken: string) {
    const user = await this.FCMModel.findOne({ userId });
    if (user) await this.FCMModel.deleteOne({ userId });
    const fcm = await new this.FCMModel({
      userId,
      fcmTokens: [fcmToken],
    }).save();
    // let fcm;
    // if (!user) {
    //   fcm = await new this.FCMModel({
    //     userId,
    //     fcmTokens: [fcmToken],
    //   }).save();
    // } else {
    //   fcm = await this.FCMModel.findOneAndUpdate(
    //     { _id: userId },
    //     {
    //       $set: { fcmTokens: [fcmToken] },
    //     },
    //   );
    // }
    return new Promise((resolve, reject) => {
      resolve(fcm);
    });
  }

  async getFCMToken(userId: string) {
    const fcm = await this.FCMModel.findOne({ userId });
    return new Promise((resolve, reject) => {
      if (!fcm) ErrorMessage.FCMTOKEN_NOT_FOUND;
      resolve(fcm);
    });
  }
}
