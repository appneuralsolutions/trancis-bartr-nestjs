import { Gender, IUserProfile } from './auth-user.interface';

export interface IRegister {
  fullName: string;
  email: string;
  mobileNo: string;
  password: string;
  dateOfBirth: Date;
  profile: IUserProfile;
  gender: Gender;
}
