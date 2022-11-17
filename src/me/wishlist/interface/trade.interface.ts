import { Document } from 'mongoose';

export interface ITrade extends Document {
  user1: string;
  user2: string;
  card1: string;
  card2: string;
}
