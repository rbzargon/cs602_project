import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './model/product.interface';
import * as sanitize from 'mongo-sanitize';
import { CreateProductDto } from './model/create-product.dto';
import * as escape from 'html-escape';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) { }

    async create(createProductDto: CreateProductDto) {
        const { name, description, price, quantity, vendor } = createProductDto;
        await this.productModel.create({
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

    // async update(product: UpdateProductDto): Promise<Product> {
    //     const {id, description, name, quantity} = product;
    //     const updates = {description, name, quantity};
    //     return this.productModel.updateOne({ _id: id }, {$set: {}})
    // }
}
