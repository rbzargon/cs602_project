import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './model/order.interface';
import { CreateOrderDto } from './model/create-order.dto';

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) {}

    async findAll(): Promise<Order[]> {
        return this.orderModel.find().exec();
    }

    async create(order: CreateOrderDto): Promise<Order> {
        return this.orderModel.create({...order});
    }
}
