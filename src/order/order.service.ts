import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './model/order.interface';
import { CreateOrderDto } from './model/create-order.dto';
import { Product } from 'src/product/model/product.interface';

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) { }

    async findAllComplete(): Promise<Order[]> {
        return this.orderModel.find({ completed: true }).exec();
    }

    async findAllIncomplete(): Promise<Order[]> {
        return this.orderModel.find({ completed: { $ne: true } }).exec();
    }

    async findWithProduct(findOptions = {}): Promise<Order[] & Product[]> {
        //join and merge with product
        return this.orderModel.aggregate([{
            $match: findOptions
        }, {
            $lookup: {
                from: 'product',
                localField: 'productId',
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
