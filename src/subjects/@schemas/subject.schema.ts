import * as mongoose from 'mongoose';

export const SubjectCategorySchema = new mongoose.Schema({
  name: { type: String, unique: true, require: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: String,
});

export const SubjectSchema = new mongoose.Schema({
  user_Id: String,
  name: { type: String, unique: true, require: true },
  categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Subject-Category' },
  ],
}).set('timestamps', true);
