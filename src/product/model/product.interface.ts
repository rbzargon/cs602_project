import { User } from 'src/user/model/user.interface';
import { Document } from 'mongoose';

export interface Product extends Document {
    _id: string;
    vendor: User['_id'];
    name: string;
    description: string;
    price: number;
    quantity: number;
}

