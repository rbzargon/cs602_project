import { Body, Controller, Delete, Get, Header, Post, Query, Render } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { ParseFloatPipe } from 'src/pipes/parse-float.pipe';
import { User } from 'src/user/model/user.interface';
import { CreateProductDto } from "./model/create-product.dto";
import { Product } from './model/product.interface';
import { UpdateProductDto } from "./model/update-product.dto";
import { ProductService } from './product.service';
import { json2xml } from 'xml-js';

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
    async getAll(@Query('q') queryText = ''): Promise<{ products: Product[], currentUser: User; }> {
        queryText = queryText.trim();
        const products = queryText ? await this.productService.findByText(queryText)
            : await this.productService.findAll();
        return { products, currentUser: AppService.currentUser };
    }

    @Get('json')
    @Header('Content-Type', 'application/json')
    async getJson(@Query('q') queryText = '', @Query('min', new ParseFloatPipe()) minPrice: number, @Query('max', new ParseFloatPipe()) maxPrice: number) {
        queryText = queryText.trim();
        const findOptions = {
            ...(queryText ? { queryText } : {}),
            ...(!isNaN(minPrice) ? { minPrice } : {}),
            ...(!isNaN(maxPrice) ? { maxPrice } : {})
        };
        const products = await this.productService.findByOptions(findOptions);
        return JSON.stringify(products, null, 2);
    }

    @Get('xml')
    @Header('Content-Type', 'text/xml')
    @Header('Content-Type', 'application/xml')
    async getXml(@Query('q') queryText = '', @Query('min', new ParseFloatPipe()) minPrice: number, @Query('max', new ParseFloatPipe()) maxPrice: number) {
        queryText = queryText.trim();
        const findOptions = {
            ...(queryText ? { queryText } : {}),
            ...(!isNaN(minPrice) ? { minPrice } : {}),
            ...(!isNaN(maxPrice) ? { maxPrice } : {})
        };
        const products = await this.productService.findByOptions(findOptions);
        const xml = json2xml(
            JSON.stringify({ products: products.map(product => ({ product })) }),
            { compact: true }
        );
        return xml;
    }

    @Delete()
    async delete(@Body() { id }: { id: string; }) {
        if (id && AppService.currentUser && AppService.currentUser.isAdmin)
            await this.productService.remove(id);
    }
}
