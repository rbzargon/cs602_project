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
    @Post()
    @Render('product/index')
    async create(@Body() createProductDto: CreateProductDto) {
        await this.productService.create(createProductDto);
        return this.getAll();
    }

    @Post('update')
    @Render('product/index')
    async update(@Body() updateProductDto: UpdateProductDto) {
        // TODO: Future development could allow the vendor to modify
        // not just admin
        if (AppService.currentUser && AppService.currentUser.isAdmin)
            await this.productService.update(updateProductDto);
        return this.getAll();
    }

    @Get()
    @Header('Content-Type', 'text/html')
    @Render('product/index')
    async getAll(@Query('q') searchText = ''): Promise<{ products: Product[], currentUser: User; }> {
        searchText = searchText.trim();
        const products = searchText ? await this.productService.findByText(searchText)
            : await this.productService.findAll();
        return { products, currentUser: AppService.currentUser };
    }

    @Delete()
    async delete(@Body() { id }: { id: string; }) {
        if (id && AppService.currentUser && AppService.currentUser.isAdmin)
            await this.productService.remove(id);
    }
}
