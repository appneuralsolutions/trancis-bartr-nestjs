import * as mongoose from 'mongoose';

export const FeedbackSchema = new mongoose.Schema({
  message: String,
  rating: String,
});
