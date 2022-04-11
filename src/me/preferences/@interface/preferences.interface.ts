import { Document } from 'mongoose';

export interface PreferencesCard extends Document {

  typeofCard: string,  
  ebayPoints: string,
  price: {
      condition: string,
      value: string
  };
  value: {
    condition: string,
    value: string
  };
}