import { IsMongoId, IsNumber } from "class-validator";
import { User } from "src/user/user.model";
import { Product } from "src/product/model/product.model";

export class Order {
    @IsMongoId()
    id: string;

    @IsMongoId()
    customerId: User['id'];

    @IsMongoId()
    productId: Product['id'];

    @IsNumber()
    quantity: number;
}