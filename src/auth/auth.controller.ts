import { Controller, Request, Req, Get, Post, Body, UseGuards, Res, HttpException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user-dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from './guards/roles.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) { }

  @Post('/register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.addUser(createUserDTO);
    return user;
  }
  // @UseGuards(LocalAuthGuard)
  // @Post('/login')
  // async login(@Request() req: any) {
  //   return this.authService.login(req.user);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(req.user);
    res.cookie('jwt', token, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,

    });
    return {
      token: token,
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  // @UseGuards(JwtAuthGuard)
  @Get('/user')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/admin')
  getDashboard(@Request() req) {
    try {
      return req.user
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('You are not admin ');
    }

  }

}
