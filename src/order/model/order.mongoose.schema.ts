import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
    customer: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: true
    },
    product: {
        ref: 'Product',
        type: Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Schema.Types.Number,
        required: true,
        min: 1
    }
}, { collection: 'order' });