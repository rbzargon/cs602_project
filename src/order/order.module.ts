import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './model/order.mongoose.schema';
import { ProductModule } from 'src/product/product.module';
import { AppService } from 'src/app.service';
import { ProductSchema } from 'src/product/model/product.mongoose.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'Product', schema: ProductSchema }
    ]),
    ProductModule
  ],
  providers: [AppService, OrderService],
  controllers: [OrderController],
  exports: [OrderService]
})
export class OrderModule { }
