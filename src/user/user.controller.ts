import { Controller, Get, Param, Post, Render, Body, Res } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { User } from './model/user.interface';
import { UserService } from './user.service';
import { CreateUserDto } from './model/create-user.dto';
import { Order } from 'src/order/model/order.interface';
import { Product } from 'src/product/model/product.interface';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    @Render('user/index')
    async create(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(createUserDto);
        return this.findAll();
    }


    @Get()
    @Render('user/index')
    async findAll(): Promise<{ users: User[]; currentUser: User; }> {
        const users = await this.userService.findAll();
        return { users, currentUser: AppService.currentUser };
    };

    @Get('/customer')
    @Render('customer/index')
    async findAllCustomersWithOrders(@Res() res): Promise<{ users: User[] & { orders: Order[] & { product: Product; }[]; }; currentUser: User; }> {
        if (!AppService.currentUser || !AppService.currentUser.isAdmin) res.redirect('/user');
        // populate customers with orders, populated with product
        const users = await this.userService.findAllCustomersWithPendingOrders();
        return { users, currentUser: AppService.currentUser };
    }

    @Get('impersonate/:id')
    @Render('user/index')
    async impersonateUser(@Param('id') id) {
        const user = await this.userService.findOneById(id);
        if (user) {
            AppService.currentUser = user;
        }
        return this.findAll();
    }
}
