import { Body, Controller, Delete, Get, Header, Param, Post, Put, Render, Query } from '@nestjs/common';
import { CreateProductDto } from "./model/create-product.dto";
import { Product } from './model/product.interface';
import { UpdateProductDto } from "./model/update-product.dto";
import { ProductService } from './product.service';
import { AppService } from 'src/app.service';
import { User } from 'src/user/model/user.interface';

@Controller('/product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Get()
    @Header('Content-Type', 'text/html')
    @Render('product/index')
    async getAll(@Query('q') searchText = ''): Promise<{ products: Product[], currentUser: User; }> {
        searchText = searchText.trim();
        const products = searchText ? await this.productService.findByText(searchText)
            : await this.productService.findAll();
        return { products, currentUser: AppService.currentUser };
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
