import * as mongoose from 'mongoose';

export const BartrRewardPointSchema = new mongoose.Schema({
    bartrSignupReward: { type: Number, require: true },
}).set('timestamps', true);
