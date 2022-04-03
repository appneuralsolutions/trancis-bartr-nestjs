import {
  IAuthUser,
  IRole,
  IUserAuth,
  IUserEducation,
  IUserEmployment,
  IUserMedical,
  IUserProfile,
} from '../@interfaces/auth-user.interface';
export class AuthUserDto implements IAuthUser {
  constructor(object) {
    this.email = object.email;
    this.uname = object.uname;
    this.phone = object.phone;
    this.jwtToken = object.jwtToken;
    this.isActive = object.isActive;
    this.privileges = object.privileges;
    this.profile = object.profile;
    // this.roles = object.roles.map((r) => r.name);
  }
  uname: string;
  profile: IUserProfile;
  medical: IUserMedical;
  educational: IUserEducation;
  employment: IUserEmployment;
  isActive: boolean;
  jwtToken: string;
  email: string;
  phone: string;
  password: string;
  privileges: object;
  roles: [IRole];
  auth: IUserAuth;
  _id: string;
}
