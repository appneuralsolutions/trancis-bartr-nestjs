import {
  Gender,
  IAuthUser,
  IRole,
  IUserAuth,
  IUserEducation,
  IUserEmployment,
  IUserMedical,
  IUserProfile,
  MaritalStatus,
} from '../@interfaces/auth-user.interface';

export class UserProfile {
  firstName: string;
  middleName: string;
  lastName: string;
  bio: string;
  gender: Gender;
  gallery: [];
  photo: string;
  birthDate: Date;
  mobileNo: string;
  nationality: string;
  maritalStatus: MaritalStatus;
  constructor(object) {
    this.firstName = object.firstName;
    // this.middleName = object.middleName;
    this.lastName = object.lastName;
    // this.roles = object.roles.map((r) => r.name);
  }
  // socialLinks: [{ name: string; url: string }];
}

export class AuthUser implements IAuthUser {
  uname: string;
  profile: IUserProfile;
  medical: IUserMedical;
  educational: IUserEducation;
  employment: IUserEmployment;
  roles: [IRole];
  auth: IUserAuth;
  isActive: boolean;
  jwtToken: string;
  _id: string;
  email: string;
  phone: string;
  privileges: object;
  username: string;
  password: string;

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
}
