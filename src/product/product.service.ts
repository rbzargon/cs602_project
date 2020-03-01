import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './model/product.interface';
import { UpdateProductDto } from './model/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) { }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
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
