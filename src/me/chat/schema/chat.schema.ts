import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  UUID: String,
  email: String,
  message: String,
  user: String,
  counter:Boolean
}).set('timestamps', true);