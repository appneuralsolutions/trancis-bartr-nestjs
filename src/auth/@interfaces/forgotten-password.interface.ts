import { Document } from 'mongoose';

export interface IForgottenPassword {
  email: string;
  token: string;
  timestamp: Date;
}
