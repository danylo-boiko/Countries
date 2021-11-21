import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from "../../services/auth/auth.service";
import { LoginRequest } from "../../requests/login-request";
import { AuthStatus } from "../../interfaces/auth-status.interface";
import { RegisterRequest } from "../../requests/register-request";
import { ValidationPipe } from "../../../../pipes/validation.pipe";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    public login(@Body(new ValidationPipe()) loginRequest: LoginRequest): Promise<AuthStatus> {
        return this.authService.login(loginRequest);
    }

    @Post('register')
    public register(@Body(new ValidationPipe()) registerRequest: RegisterRequest): Promise<AuthStatus> {
        return this.authService.register(registerRequest);
    }
}
