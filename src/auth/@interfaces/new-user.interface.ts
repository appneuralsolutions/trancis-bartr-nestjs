import { Document } from 'mongoose';

export interface NewUser extends Document {
  firstName: string;
  lastName: string;
  uname: string;
  email: string;
  phone: string;
  dob: Date;
  location: string;
  password: string;
  photo: string;
}
