import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './model/user.interface';
import { CreateUserDto } from './model/create-user.dto';
import { hashSync, genSaltSync } from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto) {
        const { password } = createUserDto;
        delete createUserDto.password;
        await this.userModel.create({
            ...createUserDto,
            passwordHash: hashSync(password, genSaltSync(10))
        });
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOneById(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }
}
