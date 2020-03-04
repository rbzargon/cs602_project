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

    async findAllComplete(): Promise<Order[]> {
        if (!AppService.currentUser) return [];
        // see all orders if admin, otherwise just your orders
        const findOptions = AppService.currentUser.isAdmin ?
            { completed: true } :
            { completed: true, customer: AppService.currentUser._id };
        return this.orderModel.find(findOptions).populate('product').exec();
    }

    async findAllIncomplete(): Promise<Order[]> {
        if (!AppService.currentUser) return [];
        // see all cart items if admin, otherwise just your orders
        const findOptions = AppService.currentUser.isAdmin ?
            { completed: { $ne: true } } :
            { completed: { $ne: true }, customer: AppService.currentUser._id };
        return this.orderModel.find(findOptions).populate('product').exec();
    }

    async findWithProduct(findOptions = {}): Promise<Order[] & Product[]> {
        // join and merge with product
        // I was interested in trying this with mongo native syntax
        // afterward I realized mongoose has this functionality with 'populate'
        return this.orderModel.aggregate([{
            $match: findOptions
        }, {
            $lookup: {
                from: 'product',
                localField: 'product',
                foreignField: '_id',
                as: 'product'
            }
        }, {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{
                        $arrayElemAt: ["$product", 0]
                    }, '$$ROOT']
                }
            }
        }, {
            $project: {
                product: 0
            }
        }]) as unknown as Order[] & Product[];
    }

    async create(order: CreateOrderDto): Promise<Order> {
        return this.orderModel.create({ ...order });
    }
}
