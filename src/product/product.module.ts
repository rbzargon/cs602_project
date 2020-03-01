import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './model/product.mongoose.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';


@Module({
    imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule { }
