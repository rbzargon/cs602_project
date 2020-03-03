import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from 'src/app.service';
import { ProductSchema } from './model/product.mongoose.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ],
    controllers: [ProductController],
    providers: [AppService, ProductService],
    exports: [ProductService]
})
export class ProductModule { }
