import * as mongoose from 'mongoose';

export const CardSchema = new mongoose.Schema({
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject-Category',
  },
  availableOf: String,
  price: String,
  title: String,
  label: { type: String, unique: true, require: true },
  value: String,
  description: String,
  images: [String],
  email: String,
  likes: { type: Number, default: 0 },
  liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}).set('timestamps', true);
