import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './model/user.interface';
import { CreateUserDto } from './model/create-user.dto';
import { hashSync, genSaltSync } from 'bcryptjs';
import { Order } from 'src/order/model/order.interface';
import { Product } from 'src/product/model/product.interface';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Order') private readonly orderModel: Model<Order>
    ) { }

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

    async findAllCustomersWithPendingOrders(): Promise<User[] & { orders: Order[] & { product: Product; }[]; }> {
        const customers = (await this.userModel.find({ isAdmin: false }).exec()).map(userModel => userModel.toObject());
        const customerIds = customers.map(c => c._id);
        // Only find orders in the cart for modification, not finalized ones
        const orders = await this.orderModel.find({
            customer: { $in: customerIds },
            completed: { $ne: true }
        }).populate('product').exec();
        const customerIdToOrders: { [customerId: string]: Order[] & { product: Product; }[]; } = orders.reduce((cusIdToOrders, order) => {
            if (!cusIdToOrders[order.customer]) {
                cusIdToOrders[order.customer] = [order];
            } else {
                cusIdToOrders[order.customer].push(order);
            }
            return cusIdToOrders;
        }, {});

        const customersWithOrders = customers.map(customer => ({
            ...customer,
            orders: customerIdToOrders[customer._id] || []
        })) as unknown as User[] & { orders: Order[] & { product: Product; }[]; };

        return customersWithOrders;
    }
}
