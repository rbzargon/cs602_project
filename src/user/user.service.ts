import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './model/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
