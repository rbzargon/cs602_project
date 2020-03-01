import { Body, Controller, Delete, Get, Param, Post, Put, Render } from '@nestjs/common';
import { Product } from './model/product.interface';
import { UpdateProductDto } from "./model/update-product.dto";
import { CreateProductDto } from "./model/create-product.dto";
import { ProductService } from './product.service';
import { ProductMongoose } from './model/product.mongoose.model';
import { Document } from 'mongoose';

@Controller('/product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Get()
    @Render('product/index')
    async getAll(): Promise<{ products: Product[] }> {
        const products = await this.productService.findAll();
        return { products };
    }

    @Get(':id')
    async getOne(@Param('id') id): Promise<Product> {
        return;
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return;
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return;
    }
}
