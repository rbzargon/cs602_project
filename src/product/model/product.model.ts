import { IsMongoId, IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { User } from 'src/user/user.model';

export class Product {
    @IsMongoId()
    id: string;
    
    @IsMongoId()
    vendorId: User['id'];

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

