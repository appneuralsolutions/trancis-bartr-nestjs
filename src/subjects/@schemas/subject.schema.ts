import * as mongoose from 'mongoose';

export const SubjectSchema = new mongoose.Schema({
  user: String,
  subject: String,
});
