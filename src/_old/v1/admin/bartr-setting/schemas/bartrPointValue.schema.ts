import * as mongoose from 'mongoose';

export const BartrPointValueSchema = new mongoose.Schema({
    bartrPointValue: { type: Number, require: true },
}).set('timestamps', true);
