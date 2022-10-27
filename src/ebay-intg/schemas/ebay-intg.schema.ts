import * as mongoose from 'mongoose';

export const EbaySchema = new mongoose.Schema({
  category: String
}).set('timestamps', true);