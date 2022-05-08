import * as mongoose from 'mongoose';

export const WishlistSchema = new mongoose.Schema({
  title: String,
  like: Boolean,
  email: String,
});
