import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { PassportModule } from "@nestjs/passport";
import { AuthController } from './controllers/auth/auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        UsersModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false
        }),
        JwtModule.register({
            secret: 'supersecretkey',
            signOptions: {
                expiresIn: '7d'
            }
        }),
    ],
    controllers: [AuthController],
    exports: [PassportModule, JwtModule],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
