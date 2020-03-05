import { Body, Controller, Get, Header, Post, Render, Put } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Product } from 'src/product/model/product.interface';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/user/model/user.interface';
import { CreateOrderDto } from './model/create-order.dto';
import { Order } from './model/order.interface';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService,
        private readonly productService: ProductService,
    ) { }

    @Get()
    @Header('Content-Type', 'text/html')
    @Render('order/index')
    async findAllComplete(): Promise<{ orders: Order[]; currentUser: User; }> {
        const completeOrders = await this.orderService.findAllCompleteWithProduct();
        return { orders: completeOrders, currentUser: AppService.currentUser };
    }

    @Get('cart')
    @Header('Content-Type', 'text/html')
    @Render('order/cart')
    async findAllIncomplete(): Promise<{ orders: Order[]; totalPrice: number; currentUser: User; }> {
        const pendingOrders = await this.orderService.findAllIncompleteWithProduct();
        const totalPrice = pendingOrders.reduce((total, order: Order & { product: Product; }) => {
            return total += order.product.price * order.quantity;
        }, 0);
        return { orders: pendingOrders, totalPrice, currentUser: AppService.currentUser };
    }

    @Put('cart')
    @Render('order/cart')
    async modifyOrderQuantity(@Body() { id, quantity }: { id: string, quantity: number; }) {
        if (id && quantity) {
            await this.orderService.modifyOrderQuantity(id, quantity);
        }
        return this.findAllIncomplete();
    }

    @Post()
    async create(@Body() order: CreateOrderDto) {
        await this.orderService.create(order);
        await this.productService.modifyRelativeQuantity(order.product, order.quantity);
    }

}
