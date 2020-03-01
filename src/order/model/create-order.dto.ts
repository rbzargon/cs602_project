import { IsMongoId, IsNumberString, Min } from 'class-validator';
import { Product } from "src/product/model/product.interface";
import { User } from "src/user/model/user.interface";


export class CreateOrderDto {
    @IsMongoId()
    customerId: User['_id'];

    @IsMongoId()
    productId: Product['_id'];

    @IsNumberString()
    @Min(1)
    quantity: number;
}
