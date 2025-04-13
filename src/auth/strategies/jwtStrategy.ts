import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'mySecretKey',
        });
    }

    validate(payload: JwtPayload): {
        userId: number;
        username: string;
        roles: string[]
    } {
        return {
            userId: payload.sub,
            username: payload.username,
            roles: payload.roles
        };
    }
}
