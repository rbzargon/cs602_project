import { Body, Controller, Get, Header, Post, Render, Put, Delete, Res, Patch } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Product } from 'src/product/model/product.interface';
import { User } from 'src/user/model/user.interface';
import { CreateOrderDto } from './model/create-order.dto';
import { Order } from './model/order.interface';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService,
    ) { }

    @Post()
    async create(@Body() order: CreateOrderDto, @Res() response) {
        // CreateOrderDto is validated by the validation pipe in main.ts
        await this.orderService.create(order);
        return response.redirect('/product');
    }

    @Patch('cart/finalize')
    async finalizeAllCustomerIncomplete(@Body() { customerId }: { customerId: string; }) {
        await this.orderService.finalizeAllCustomerIncomplete(customerId);
    }

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
    async modifyQuantity(@Body() { id, quantity }: { id: string, quantity: number; }) {
        if (id && quantity) {
            await this.orderService.modifyQuantity(id, quantity);
        }
        return this.findAllIncomplete();
    }

    @Delete('cart')
    @Render('order/cart')
    async removeOrder(@Body() { id }: { id: string; }) {
        if (id) this.orderService.remove(id);
        return this.findAllIncomplete();
    }

}
