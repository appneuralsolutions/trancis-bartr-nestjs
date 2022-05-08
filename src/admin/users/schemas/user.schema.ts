import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const UserSchema = new mongoose.Schema({
  fullName: { type: String, require: true },
  // uname: { type: String, unique: true, require: true },
  email: { type: String, unique: true, require: true },
  phone: { type: String, unique: true, require: true },
  password: { require: true, type: String },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Profile' },
  personal: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Personal' },
  medical: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Medical' },
  educational: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User-Educational',
  },
  employment: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Employment' },
  auth: {
    session: {
      isOnline: { type: Boolean, default: false },
      devices: [String],
      locations: [String],
    },
    validation: {
      email: { type: Boolean, default: true },
      phone: { type: Boolean, default: false },
    },
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
  },
  isActive: { type: Boolean, default: true },
}).set('timestamps', true);

UserSchema.pre('save', function (next) {
  const user: any = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err1, hash) => {
      if (err1) {
        return next(err1);
      }
      user.password = hash;
      next();
    });
  });
}).set('timestamps', true);

UserSchema.methods.checkPassword = function (attempt, callback) {
  const user: any = this;
  bcrypt.compare(attempt, user.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};
