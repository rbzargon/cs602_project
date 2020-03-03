import { Body, Controller, Delete, Get, Header, Param, Post, Put, Render, Query } from '@nestjs/common';
import { CreateProductDto } from "./model/create-product.dto";
import { Product } from './model/product.interface';
import { UpdateProductDto } from "./model/update-product.dto";
import { ProductService } from './product.service';

@Controller('/product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Get()
    @Header('Content-Type', 'text/html')
    @Render('product/index')
    async getAll(@Query('q') searchText = ''): Promise<{ products: Product[], currentUserId: string; }> {
        searchText = searchText.trim();
        const products = searchText ? await this.productService.findByText(searchText)
            : await this.productService.findAll();
        //TODO: replace hard-coded currentUserId
        return { products, currentUserId: '5e5b07f66a2f5c3066cacc4b' };
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
