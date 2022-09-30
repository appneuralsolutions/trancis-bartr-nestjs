import * as mongoose from 'mongoose';
export const DeductedAmountSchema = new mongoose.Schema({
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deductedAmount: Number,
}).set('timestamps', true);
