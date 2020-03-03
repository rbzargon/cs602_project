import { Controller, Get, Render, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.interface';
import { AppService } from 'src/app.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    @Render('user/index')
    async findAll(): Promise<{ users: User[]; currentUser: User; }> {
        const users = await this.userService.findAll();
        return { users, currentUser: AppService.currentUser };
    };

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
