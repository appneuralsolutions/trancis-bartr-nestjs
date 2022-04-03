import { Document } from 'mongoose';

export interface CreateCard extends Document {
  availableOf: string;
  price: string;
  title: string;
  lable: string;
  value: string;
  description: string;
  image: string;
  email: string;
}

/* availableOf: String,
    price: String,
    title: String,
    lable: String,
    value: String,
    description: String,
    image: String */
