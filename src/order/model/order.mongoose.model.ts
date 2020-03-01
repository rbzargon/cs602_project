import { model } from 'mongoose';
import { OrderSchema } from './order.mongoose.schema';

export const OrderMongoose = model('Order', OrderSchema);