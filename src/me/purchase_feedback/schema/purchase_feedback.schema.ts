import * as mongoose from 'mongoose';

export const PurchaseFeedbackSchema = new mongoose.Schema({
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },  
  createdBy: String,
  message: String,
  rating: String,
}).set('timestamps', true);