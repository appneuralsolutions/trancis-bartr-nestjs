import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  message: String,
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' },
  sentTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  counter: { type: mongoose.Schema.Types.ObjectId, ref: 'Counter' },
  amount: String,
}).set('timestamps', true);

export const ChatRoomSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  cardId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  // isDealClosed: String,
  // isCompleteDealClosed: String,
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
  finalCounter: { type: mongoose.Schema.Types.ObjectId, ref: 'Counter' },
}).set('timestamps', true);

export const CounterSchema = new mongoose.Schema({
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  amount: Number,
  isAccepted: { type: Boolean || null, default: null },
}).set('timestamps', true);

export const DealSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  isAccepted: { type: Boolean || null, default: null },
  isDealClosed: String,
  isCompleteDealClosed: String,
}).set('timestamps', true);
