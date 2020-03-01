import { Controller, Header, Get, Render, Post, Body, Res } from '@nestjs/common';
import { Order } from './model/order.interface';
import { OrderService } from './order.service';
import { CreateOrderDto } from './model/create-order.dto';
import { ProductService } from 'src/product/product.service';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService,
        private readonly productService: ProductService,
    ) { }

    @Get()
    @Header('Content-Type', 'text/html')
    @Render('order/index')
    async getAll(): Promise<{ orders: Order[] }> {
        const orders = await this.orderService.findAll();
        return { orders };
    }

    @Post()
    @Render('order/index')
    async create(@Body() order: CreateOrderDto) {
        await this.orderService.create(order);
        await this.productService.modifyRelativeQuantity(order.productId, order.quantity);
        return this.getAll();
    }

}
