import {
  IAuthUser,
  IRole,
  IUserAuth,
  IUserEducation,
  IUserEmployment,
  IUserMedical,
  IUserProfile,
} from '../@interfaces/auth-user.interface';
export class AuthUser implements IAuthUser {
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
}
