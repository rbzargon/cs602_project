import { Document } from 'mongoose';
import { Product } from "src/product/model/product.interface";
import { User } from "src/user/model/user.interface";

export interface Order extends Document {
    _id: string;
    completed: boolean;
    customerId: User['_id'];
    productId: Product['_id'];
    quantity: number;
}