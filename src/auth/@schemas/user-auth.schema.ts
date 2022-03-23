import * as mongoose from 'mongoose';

export const UserAuthSchema = new mongoose.Schema({
  isSuper: { type: Boolean, default: false },
  session: [
    {
      device: String,
      fromIP: String,
      onLocation: String,
      isOnline: { type: Boolean, default: false },
      lastLogin: String,
      jwtToken: String,
    },
  ],
  verification: {
    email: { type: Boolean, default: false },
    phone: { type: Boolean, default: false },
  },
  accessibility: {
    atLocations: [String],
    onRoutes: [String],
    onTime: [String], //cron expresssion
    atDevices: [String],
  },
  homeRoute: {
    type: String,
    default: '/home',
  },
  isLocked: { type: Boolean, default: false },
}).set('timestamps', true);
