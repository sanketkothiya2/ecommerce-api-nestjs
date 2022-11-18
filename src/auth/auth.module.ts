import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from "dotenv";

// dotenv.config({ path: `${__dirname}/../../config.env` });


// console.log(process.env.JWT_SECRET);

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      // secret: process.env.JWT_SECRET,
      secret: 'topsecret',

      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  controllers: [AuthController],
})
export class AuthModule { }