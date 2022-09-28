import { Document } from 'mongoose';

export interface Match extends Document {
  cardId: string;
  rightSwiped: boolean;
  userId: string;
}
