import { IsNotEmpty, IsNumber, IsString, Min, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @IsMongoId()
    vendor: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    price: number;

    @IsNumber()
    @Type(() => Number)
    @Min(0)
    quantity: number;
}
