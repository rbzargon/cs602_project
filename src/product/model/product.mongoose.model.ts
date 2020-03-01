import { model } from 'mongoose';
import { ProductSchema } from './product.mongoose.schema';

export const ProductMongoose = model('Product', ProductSchema);