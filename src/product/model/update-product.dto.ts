
import { Product } from './product.interface';
import { IsMongoId, IsString, IsOptional } from 'class-validator';

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
    @IsString()
    quantity?: number;
}
