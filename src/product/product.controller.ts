import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from './model/product.model';
import { UpdateProductDto } from "./model/update-product.dto";
import { CreateProductDto } from "./model/create-product.dto";
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAll(): Promise<Product[]> {
        return [];
    }

    @Get(':id')
    async getOne(@Param('id') id): Promise<Product> {
        return;
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        
    }

    @Put(':id')
    async update (@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        
    }
}
