import { AuthService } from "./services/auth/auth.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { User } from "../../entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'supersecretkey',
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        return await this.authService.validateUser(payload);
    }
}
