import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './model/order.interface';
import { CreateOrderDto } from './model/create-order.dto';
import { Product } from 'src/product/model/product.interface';
import { AppService } from 'src/app.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order') private readonly orderModel: Model<Order>,
        @InjectModel('Product') private readonly productModel: Model<Product>
    ) { }

    async findAllCompleteWithProduct(): Promise<Order[] & { product: Product; }[]> {
        if (!AppService.currentUser) return [];
        // see all orders if admin, otherwise just your orders
        const findOptions = AppService.currentUser.isAdmin ?
            { completed: true } :
            { completed: true, customer: AppService.currentUser._id };
        return this.orderModel.find(findOptions).populate('product').exec() as unknown as Order[] & { product: Product; }[];
    }

    async findAllIncompleteWithProduct(): Promise<Order[] & { product: Product; }[]> {
        if (!AppService.currentUser) return [];
        // see all cart items if admin, otherwise just your orders
        const findOptions = AppService.currentUser.isAdmin ?
            { completed: { $ne: true } } :
            { completed: { $ne: true }, customer: AppService.currentUser._id };
        return this.orderModel.find(findOptions).populate('product').exec() as unknown as Order[] & { product: Product; }[];
    }

    async create(order: CreateOrderDto): Promise<Order> {
        return this.orderModel.create({ ...order });
    }
}
