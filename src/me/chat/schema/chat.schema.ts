import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  message: String,
  sentTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  counter: { type: mongoose.Schema.Types.ObjectId, ref: 'Counter' },
}).set('timestamps', true);

export const ChatRoomSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isDealClosed: Boolean,
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
  finalCounter: { type: mongoose.Schema.Types.ObjectId, ref: 'Counter' },
}).set('timestamps', true);

export const CounterSchema = new mongoose.Schema({
  amount: Number,
  isAccepted: Boolean,
}).set('timestamps', true);
