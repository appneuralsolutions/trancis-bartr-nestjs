import * as mongoose from 'mongoose';

export const PreferencesSchema = new mongoose.Schema({
 // typeofcard, ebaypoints, 
  
 typeofCard: {type: String},
 ebayPoints: {type: String},
  price: { type: [{
    condition:  { type: String,
      enum : ['gt','lt','eq'],
      default: 'eq'},
    value:   { type: String }
  }]},
  value: { type: [{
    condition:  { type: String,
      enum : ['gt','lt','eq'],
      default: 'eq'},
    value:   { type: String }
  }]},
});