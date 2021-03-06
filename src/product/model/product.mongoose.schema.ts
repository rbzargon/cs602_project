import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
    vendor: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: Schema.Types.String,
        required: true,
        trim: true,
        minlength: 1,
    },
    description: {
        type: Schema.Types.String,
        required: true,
        trim: true
    },
    price: {
        type: Schema.Types.Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Schema.Types.Number,
        required: true,
        min: 0
    }
}, { collection: 'product' });