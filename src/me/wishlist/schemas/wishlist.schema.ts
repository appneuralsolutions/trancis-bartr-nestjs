import * as mongoose from 'mongoose';

export const WishlistSchema = new mongoose.Schema({
  cardId: String,
  like: Boolean,
  userId: String,
}).set('timestamps', true);
