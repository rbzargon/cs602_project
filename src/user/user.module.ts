import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from 'src/app.service';
import { OrderSchema } from 'src/order/model/order.mongoose.schema';
import { UserSchema } from './model/user.mongoose.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
        { name: 'Order', schema: OrderSchema },
    ])],
    controllers: [UserController],
    providers: [AppService, UserService],
    exports: [UserService]
})
export class UserModule {}
