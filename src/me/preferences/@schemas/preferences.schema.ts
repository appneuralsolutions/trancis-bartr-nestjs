import * as mongoose from 'mongoose';

export const PreferencesSchema = new mongoose.Schema({
  // typeofcard, ebaypoints,

  typeofCard: String,
  ebayPoints: String,
  price: String,
  value: String,
});
