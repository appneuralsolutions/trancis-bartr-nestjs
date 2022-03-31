import * as mongoose from 'mongoose';

export const SubjectSchema = new mongoose.Schema({
  user_Id: String,
  subject: String,
});
