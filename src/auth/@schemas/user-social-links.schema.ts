import { AddressSchema } from '../../shared/@schemas/address.schema';
import * as mongoose from 'mongoose';

export const UserSocialLinksSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  bio: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  address: AddressSchema,
  gallery: [String],
  photo: String,
  birthDate: Date,
  nationality: String,
  maritalStatus: {
    type: String,
    enum: ['married', 'un-married'],
    default: 'un-married',
  },
});
