import * as mongoose from 'mongoose';

export const UserPersonalSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  bio: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  gallery: [String],
  photo: String,
  birthDate: Date,
  nationality: String,
  maritalStatus: {
    type: String,
    enum: ['married', 'un-married'],
    default: 'un-married',
  },
}).set('timestamps', true);
