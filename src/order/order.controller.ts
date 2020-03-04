import { Controller, Header, Get, Render, Post, Body, Res, Param } from '@nestjs/common';
import { Order } from './model/order.interface';
import { OrderService } from './order.service';
import { CreateOrderDto } from './model/create-order.dto';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/model/product.interface';
import { AppService } from 'src/app.service';
import { User } from 'src/user/model/user.interface';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService,
        private readonly productService: ProductService,
    ) { }

    @Get()
    @Header('Content-Type', 'text/html')
    @Render('order/index')
    async findAllComplete(): Promise<{ orders: Order[]; currentUser: User }> {
        const completeOrders = await this.orderService.findAllComplete();
        console.log(completeOrders);
        return { orders: completeOrders, currentUser: AppService.currentUser };
    }

    @Get('cart')
    @Header('Content-Type', 'text/html')
    @Render('order/cart')
    async findAllIncomplete(): Promise<{ orders: Order[] & Product[]; totalPrice: number; currentUser: User }> {
        const pendingOrders = await this.orderService.findWithProduct({ completed: false });
        const totalPrice = pendingOrders.reduce((total, order: Order & Product) => {
            return total += order.price * order.quantity;
        }, 0);
        return { orders: pendingOrders, totalPrice, currentUser: AppService.currentUser };
    }

    @Post()
    async create(@Body() order: CreateOrderDto) {
        await this.orderService.create(order);
        await this.productService.modifyRelativeQuantity(order.product, order.quantity);
    }

}
