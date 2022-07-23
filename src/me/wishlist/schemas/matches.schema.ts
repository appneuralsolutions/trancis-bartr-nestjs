import * as mongoose from 'mongoose';

export const MatchSchema = new mongoose.Schema({
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  rightSwiped: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}).set('timestamps', true);
