import * as mongoose from 'mongoose';

export const CreateCardSchema = new mongoose.Schema({
    availableOf: String,
    price: String,
    title: String,
    lable: String,
    value: String,
    description: String,
    image: String,
    email: String

})