import { Injectable } from '@nestjs/common';
import { User } from './user/model/user.interface';

@Injectable()
export class AppService {
  private static _currentUser: User;

  static get currentUser(): User {
    return AppService._currentUser;
  }

  static set currentUser(user: User) {
    AppService._currentUser = user;
  }
  
  
}
