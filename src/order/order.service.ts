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

    async modifyOrderQuantity(id: string, nextQuantity: number): Promise<void> {
        const order = await this.orderModel.findById(id).populate('product').exec() as Order & { product: Product; };
        // Error if the user doesn't match the order, or they aren't admin
        if (order.customer.toString() !== AppService.currentUser._id.toString() && !AppService.currentUser.isAdmin) {
            console.log(order.customer, AppService.currentUser._id);
            throw Error('User not authorized to modify order');
        }
        const currentQuantity = order.quantity;
        const relativeQuantityChange = nextQuantity - currentQuantity;
        if (relativeQuantityChange === 0) return;
        if (relativeQuantityChange > order.product.quantity) {
            throw Error('Insufficient available product');
        }
        // Update the product and order quantities
        await order.product.updateOne({ $inc: { quantity: -relativeQuantityChange } });
        await order.updateOne({ quantity: nextQuantity }).exec();
    }

    async create(order: CreateOrderDto): Promise<Order> {
        return this.orderModel.create({ ...order });
    }
}
