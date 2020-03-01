import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './model/product.mongoose.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { OrderModule } from 'src/order/order.module';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]), 
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule { }
