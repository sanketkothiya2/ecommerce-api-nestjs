import { ExtractJwt, Strategy } from 'passport-jwt';
// import { ExtractJwt } from 'passport-jwt';
// import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import * as dotenv from "dotenv";
// dotenv.config({ path: `${__dirname}/../../../config.env` });
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // secretOrKey: process.env.JWT_SECRET,
            secretOrKey: 'topsecret',
        });
    }
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username, email: payload.email, roles: payload.roles };
    }
}
