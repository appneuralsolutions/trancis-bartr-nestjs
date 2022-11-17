import * as mongoose from 'mongoose';

export const TradeSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  card1: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  card2: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
}).set('timestamps', true);
