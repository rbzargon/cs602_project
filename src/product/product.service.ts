import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './model/product.interface';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) { }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findByText(searchText: string): Promise<Product[]> {
        //possibly help prevent nosql injection
        searchText = escape(searchText);
        //find and sort by match on the text index (db configuration)
        //which includes both the title and description
        return this.productModel.find(
            { $text: { $search: searchText } },
            { score: { $meta: 'textScore' } },
        ).sort({ score: { $meta: 'textScore' } });
    }

    async modifyRelativeQuantity(id: string, quantity: number) {
        const product = await this.productModel.findOne({_id: id}).exec();
        if (product.quantity - quantity < 0)
            throw Error('Insufficient quantity');
        return this.productModel.updateOne({_id: id}, { $inc: { quantity }})
    }

    // async update(product: UpdateProductDto): Promise<Product> {
    //     const {id, description, name, quantity} = product;
    //     const updates = {description, name, quantity};
    //     return this.productModel.updateOne({ _id: id }, {$set: {}})
    // }
}
