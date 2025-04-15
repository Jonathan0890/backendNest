import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './types/jwt-payload.interface';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.usersService.getUserByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(loginDto: LoginDto): Promise<{ access_token: string }> {
        const user: User | null = await this.validateUser(loginDto.username, loginDto.password);

        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const payload = { username: user.username, sub: user.id, roles: user.roles };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async singup(signupDto: SignupDto): Promise<{ access_token: string, refresh_token: string }> {
        const hashedPassword = await bcrypt.hash(signupDto.password, 10);
        
        const newUser: User = await this.usersService.createUser({
            ...signupDto, 
            password: hashedPassword});

        return this.generateTokens(newUser);
    }

    generateTokens(user: User) {
        const payload = { username: user.username, sub: user.id, roles: user.roles };

        const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
        const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

        return {
            access_token,
            refresh_token
        };
    }

    async refreshTokens(refreshToken: string) {
        try {
            const payload = this.jwtService.verify<JwtPayload>(refreshToken);
            const user = await this.usersService.getUserByUsername(payload.username);

            if (!user) {
                throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
            }

            return this.generateTokens(user);
        } catch (error) {
            console.error('Error verifying refresh token',error);
            throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
        }
    }
}
