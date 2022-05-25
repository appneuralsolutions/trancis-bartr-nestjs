import * as mongoose from 'mongoose';

export const WishlistSchema = new mongoose.Schema({
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  like: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}).set('timestamps', true);
