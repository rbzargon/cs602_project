import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
    customerId: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: true
    },
    productId: {
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