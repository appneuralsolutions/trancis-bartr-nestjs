import { Gender, IUserProfile } from './auth-user.interface';

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  password: string;
  birthDate: Date;
  gender: Gender;
}
