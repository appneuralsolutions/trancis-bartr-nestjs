import {Document} from 'mongoose'

export interface wishlist extends Document {
        title: string;
        like: boolean;
        email: string;
}