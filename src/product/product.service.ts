import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './model/product.interface';
import * as sanitize from 'mongo-sanitize';
import { CreateProductDto } from './model/create-product.dto';
import * as escape from 'html-escape';
import { UpdateProductDto } from './model/update-product.dto';
import { Order } from 'src/order/model/order.interface';

@Injectable()
export class ProductService {

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
        @InjectModel('Order') private readonly orderModel: Model<Order>
    ) { }

    async create(createProductDto: CreateProductDto) {
        const { name, description, price, quantity, vendor } = createProductDto;
        return this.productModel.create({
            name: escape(name),
            description: escape(description),
            price,
            quantity,
            vendor
        });
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findByText(searchText: string): Promise<Product[]> {
        //help prevent nosql injection
        searchText = sanitize(searchText);
        //find and sort by match on the text index
        //which includes both the title and description (compound index)
        //see https://docs.mongodb.com/manual/core/index-text/#create-text-index
        return this.productModel.find(
            { $text: { $search: searchText } },
            { score: { $meta: 'textScore' } },
        ).sort({ score: { $meta: 'textScore' } });
    }

    async modifyRelativeQuantity(id: string, quantity: number) {
        const product = await this.productModel.findOne({ _id: id }).exec();
        if (product.quantity - quantity < 0)
            throw Error('Insufficient quantity');
        return this.productModel.updateOne({ _id: id }, { $inc: { quantity } });
    }

    async update(product: UpdateProductDto) {
        const { id, ...updates } = product;
        return this.productModel.updateOne({ _id: id }, { $set: { ...updates } }).exec();
    }

    async remove(id: string) {
        await this.productModel.deleteOne({ _id: id });
        //cascade deletion to orders with the product
        await this.orderModel.deleteMany({ product: id });
    }
}
