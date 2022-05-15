import * as mongoose from 'mongoose';

export const FeedbackSchema = new mongoose.Schema({
  email: String,
  message: String,
  rating: String,
}).set('timestamps', true);
