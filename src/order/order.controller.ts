import { Controller, Header } from '@nestjs/common';

@Controller('order')
export class OrderController {

    @Get()
    @Header('Content-Type', 'text-html')
    @Render('order/index')
    async getAll: Promise<{orders: Order[]}> {
        const orders = await this.orderService.findAll();
        return { orders };
    }

}
