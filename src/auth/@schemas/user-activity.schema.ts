import * as mongoose from 'mongoose';

export const UserActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  activities: [
    {
      route: String,
      action: String,
      describe: String,
      timestamp: String,
    },
  ],
}).set('timestamps', true);
