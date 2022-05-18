import * as mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema({
  houseNo: String,
  street: String,
  city: String,
  pinCode: String,
  state: String,
  country: String,
  landMark: String,
  gpsLocation: String,
}).set('timestamps', true);
