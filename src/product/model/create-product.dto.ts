import { IsString, IsNumber, IsNumberString, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;
    
    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;
}
