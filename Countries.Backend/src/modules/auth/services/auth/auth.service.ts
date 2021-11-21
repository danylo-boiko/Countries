import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../../../users/services/users/users.service";
import { LoginRequest } from "../../requests/login-request";
import { AuthStatus } from "../../interfaces/auth-status.interface";
import * as bcrypt from "bcrypt";
import { User } from "../../../../entities/user.entity";
import { JwtPayload } from "../../interfaces/jwt-payload.interface";
import { RegisterRequest } from "../../requests/register-request";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async login(loginRequest: LoginRequest): Promise<AuthStatus> {
        const storedUser = await this.usersService.findByUsername(loginRequest.username);

        if(! await bcrypt.compare(loginRequest.password, storedUser.hashedPassword)){
            throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
        }

        const token = this._createToken(storedUser);

        return {
            success: true,
            message: 'User is successfully authenticated',
            ...token
        }
    }

    async register(registerRequest: RegisterRequest): Promise<AuthStatus> {
        const createdUser: User = await this.usersService.create(registerRequest.username, registerRequest.password);
        const token = this._createToken(createdUser);

        return {
            success: true,
            message: 'User is successfully registered',
            ...token
        };
    }

    async validateUser(jwtPayload: JwtPayload): Promise<User> {
        return await this.usersService.findByPayload(jwtPayload);
    }

    private _createToken(user: User): any {
        return {
            expiresIn: '7d',
            accessToken: this.jwtService.sign({
                username: user.username
            }),
        };
    }
}
