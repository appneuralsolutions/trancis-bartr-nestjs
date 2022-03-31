import * as mongoose from 'mongoose';

export const NewUserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    DOB: Date,
    location: String,
    password: String,
    photo:String,

})

