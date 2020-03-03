import { Controller, Get, Render, Redirect } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Redirect('/user')
  root() {
    return;
  }
}
