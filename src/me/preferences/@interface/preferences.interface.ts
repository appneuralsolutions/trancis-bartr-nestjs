import { Document } from 'mongoose';

export interface PreferencesCard extends Document {
  typeofCard: string;
  ebayPoints: string;
  price: string;
  value: string;
}
