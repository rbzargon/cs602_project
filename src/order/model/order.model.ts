import { IsMongoId, IsNumber } from "class-validator";
import { User } from "src/user/model/user.model";
import { Product } from "src/product/model/product.model";

export class Order {
    @IsMongoId()
    _id: string;

    @IsMongoId()
    customerId: User['_id'];

    @IsMongoId()
    productId: Product['_id'];

    @IsNumber()
    quantity: number;
}