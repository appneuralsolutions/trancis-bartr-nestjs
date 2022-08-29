import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface CreateCard extends Document {
  availableOf: string;
  price: string;
  title: string;
  label: string;
  value: string;
  description: string;
  image: string[];
  email: string;
  subject: string;
  likes: number;
  liked: string[];
  views: number;
  latlong: string[];
}

/* availableOf: String,
    price: String,
    title: String,
    lable: String,
    value: String,
    description: String,
    image: String */
