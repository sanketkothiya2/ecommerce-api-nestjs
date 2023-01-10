import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get()
  findAll(@Req() request: any) {
    console.log(request.cookies['jwt']); // or "request.cookies['cookieKey']"
    // or console.log(request.signedCookies);
  }

  
}
