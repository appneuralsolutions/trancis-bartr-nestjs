import * as mongoose from 'mongoose';

export const CardSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject-Category' },
  availableOf: String,
  price: String,
  title: String,
  label: { type: String, unique: true, require: true },
  value: String,
  description: String,
  images: [String],
  email: String,
  year: String,
  location: String,
  hpValue: String,
  // subject: String,
  likes: { type: Number, default: 0 },
  liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  latlong :
  {
      type:{
          type:String,
      },
      coordinates:[Number],
  },
}).set('timestamps', true);
