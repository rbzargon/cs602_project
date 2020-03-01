import { IsMongoId, IsNumber, Min } from 'class-validator';
import { Product } from "src/product/model/product.interface";
import { User } from "src/user/model/user.interface";
import { Type } from "class-transformer";


export class CreateOrderDto {
    @IsMongoId()
    customerId: User['_id'];

    @IsMongoId()
    productId: Product['_id'];

    @IsNumber()
    @Type(() => Number)
    @Min(0)
    quantity: number;
}
