import { IsMongoId, IsEmail, IsString, IsBoolean } from "class-validator";

export class User {
    
    @IsMongoId()
    id: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsBoolean()
    isVendor: boolean;
    
}