
import { Product } from './product.interface';
import { IsMongoId, IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto implements Partial<Product>{

    @IsMongoId()
    id: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    price?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    quantity?: number;
}
