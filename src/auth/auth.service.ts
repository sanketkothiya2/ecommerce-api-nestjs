import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'; // 1
import { Controller, Request, Post, Body, Response } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { } // 2

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUser(email);
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );
    if (user && isPasswordMatch) {
      return user;
    }
    return null;
  }

  async login(user: any) {

    try {
      const payload = { username: user.username, email: user.email, sub: user._id, roles: user.roles };
      const access_token = await this.jwtService.sign(payload)
      // console.log("🚀 ~ file: auth.service.ts ~ line 25 ~ AuthService ~ login ~ access_token", access_token)
      // res.cookie('token', access_token, {
      //   expires: new Date(new Date().getTime() + 30 * 1000),
      //   sameSite: 'strict',
      //   httpOnly: true,
      // });
      return access_token;

    } catch (error) {
      throw new Error("somthin wrong while loging")
    }
  }
}