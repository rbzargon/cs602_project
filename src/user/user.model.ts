import { IsMongoId, IsEmail, IsString, IsBoolean, IsNotEmpty } from "class-validator";

export class User {
    
    @IsMongoId()
    _id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    passwordHash: string;

    @IsBoolean()
    isVendor: boolean;
    
}