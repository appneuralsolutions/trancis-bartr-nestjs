import { Document } from 'mongoose';

export interface Match extends Document {
  title: string;
  rightSwiped: boolean;
  email: string;
}
