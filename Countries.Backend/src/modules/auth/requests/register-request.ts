import { IsNotEmpty, Length } from "class-validator";

export class RegisterRequest {
    @IsNotEmpty()
    @Length(3, 32)
    username: string;

    @IsNotEmpty()
    @Length(8, 100)
    password: string;
}
