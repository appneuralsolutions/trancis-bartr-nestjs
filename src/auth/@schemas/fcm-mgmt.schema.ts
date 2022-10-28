import * as mongoose from 'mongoose';

export const FCMMgmtSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    require: true,
  },
  fcmTokens: [String],
}).set('timestamps', true);
