import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const AuthUserSchema = new mongoose.Schema({
  uname: { type: String, require: true },
  fullName: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  phone: { type: String, unique: true, require: true },
  password: { require: true, type: String },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Profile' },
  auth: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Auth' },
  settings: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Setting' },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User-Role' }],
  privileges: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Privilege' },
  medical: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Medical' },
  educational: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User-Educational',
  },
  employment: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Employment' },
  isActive: { type: Boolean, default: true },
}).set('timestamps', true);

AuthUserSchema.pre('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
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

AuthUserSchema.methods.checkPassword = function (attempt, callback) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user: any = this;
  bcrypt.compare(attempt, user.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};
