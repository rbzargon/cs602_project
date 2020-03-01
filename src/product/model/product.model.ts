import { IsMongoId, IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { User } from 'src/user/user.model';

export class Product {
    @IsMongoId()
    _id: string;
    
    @IsMongoId()
    vendorId: User['_id'];

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

