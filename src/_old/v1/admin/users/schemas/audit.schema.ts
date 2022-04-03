import * as mongoose from 'mongoose';

export const AuditSchema = new mongoose.Schema({
  user: String,
  ip: String,
  system: String,
  request: {
    method: String,
    url: String,
    query: Object,
    body: Object,
    headers: Object,
  },
  response: {
    status: String,
    body: Object,
  },
}).set('timestamps', true);
