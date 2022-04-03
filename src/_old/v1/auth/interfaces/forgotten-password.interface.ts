import { Document } from 'mongoose';

export interface IForgottenPassword{
  email: string;
  newPasswordToken: string;
  timestamp: Date;
}
