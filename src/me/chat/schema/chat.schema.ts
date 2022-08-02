import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  email: String,
  message: String,
  user: String,
  counter:Boolean
}).set('timestamps', true);