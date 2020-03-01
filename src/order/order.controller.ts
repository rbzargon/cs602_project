import { Controller, Header, Get, Render } from '@nestjs/common';
import { Order } from './model/order.interface';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

    constructor(private readonly orderService: OrderService) { }

    @Get()
    @Header('Content-Type', 'text-html')
    @Render('order/index')
    async getAll(): Promise<{orders: Order[]}> {
        const orders = await this.orderService.findAll();
        return { orders };
    }

}
