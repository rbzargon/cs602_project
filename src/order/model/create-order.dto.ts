import { IsMongoId, IsNumber, Min } from 'class-validator';
import { Product } from "src/product/model/product.interface";
import { User } from "src/user/model/user.interface";
import { Type } from "class-transformer";


export class CreateOrderDto {
    @IsMongoId()
    customer: User['_id'];

    @IsMongoId()
    product: Product['_id'];

    @IsNumber()
    @Type(() => Number)
    @Min(0)
    quantity: number;
}
