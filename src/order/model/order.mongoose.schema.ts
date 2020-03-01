import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Schema.Types.Number,
        required: true,
        min: 1
    }
}, { collection: 'order' });