import * as mongoose from 'mongoose';

export const CreateCardSchema = new mongoose.Schema({
  availableOf: String,
  price: String,
  title: String,
  label: { type: String, unique: true, require: true },
  value: String,
  description: String,
  images: [String],
  email: String,
  subject: String,
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
});
