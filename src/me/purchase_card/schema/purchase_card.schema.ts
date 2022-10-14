import * as mongoose from 'mongoose';

export const PurchaseCardSchema = new mongoose.Schema({
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },  
  purchaseBy: String
}).set('timestamps', true); 