import { Document } from 'mongoose';

export interface IEmailVerification{
  email: string,
  emailToken: string,
  timestamp: Date,
}