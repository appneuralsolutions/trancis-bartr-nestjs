import * as mongoose from 'mongoose';

export const SubjectCategorySchema = new mongoose.Schema({
  name: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  image: String,
});

export const SubjectSchema = new mongoose.Schema({
  user_Id: String,
  subject: String,
  categories: [String],
});
