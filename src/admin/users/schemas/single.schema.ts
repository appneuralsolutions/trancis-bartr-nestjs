import * as mongoose from 'mongoose';

export const SingleValidationSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
});
