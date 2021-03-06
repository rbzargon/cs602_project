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

    async create(order: CreateOrderDto): Promise<void> {
        if (order.customer.toString() !== AppService.currentUser._id.toString() && !AppService.currentUser.isAdmin) {
            throw Error('User not authorized to create order');
        }

        const product = await this.productModel.findById(order.product).exec();

        if (!product) throw Error('Product not found');
        if (product.quantity < order.quantity) {
            throw Error('Insufficient available product');
        }

        await product.updateOne({ $inc: { quantity: -order.quantity } }).exec();

        const existingOrderWithProduct = await this.orderModel.findOne({
            completed: { $ne: true },
            customer: AppService.currentUser._id.toString(),
            product: product._id
        }).exec();

        // We may actually need to only update an order instead of creating one
        if (existingOrderWithProduct) {
            await existingOrderWithProduct.updateOne({ $inc: { quantity: order.quantity } }).exec();
        } else {
            await this.orderModel.create({ ...order });
        }
    }

    // read methods
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

    // update methods
    async finalizeAllCustomerIncomplete(customerId: string): Promise<void> {
        if (!AppService.currentUser) throw Error('No user found');
        if (customerId !== AppService.currentUser._id.toString() && !AppService.currentUser.isAdmin) {
            throw Error('User not authorized to finalize orders');
        }
        await this.orderModel.updateMany({
            completed: { $ne: true },
            customer: customerId.toString(),
        }, { $set: { completed: true } }).exec();
    }

    async modifyQuantity(id: string, nextQuantity: number): Promise<void> {
        if (!AppService.currentUser) throw Error('No user found');
        const order = await this.orderModel.findById(id).populate('product').exec() as Order & { product: Product; };
        // Error if the user doesn't match the order, or they aren't admin
        if (order.customer.toString() !== AppService.currentUser._id.toString() && !AppService.currentUser.isAdmin) {
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

    //delete methods
    async remove(id: string) {
        const order = await this.orderModel.findById(id).populate('product').exec() as Order & { product: Product; };
        if (order.customer.toString() !== AppService.currentUser._id.toString() && !AppService.currentUser.isAdmin) {
            throw Error('User not authorized to modify order');
        }
        const orderQuantity = order.quantity;
        const product = order.product;
        await order.remove();
        await product.updateOne({ $inc: { quantity: orderQuantity } });
    }

}
