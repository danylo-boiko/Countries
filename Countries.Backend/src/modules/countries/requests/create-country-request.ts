import { IsEnum, IsNotEmpty, Min, MinLength } from "class-validator";
import { Continent } from "../../../enums/continent.enum";

export class CreateCountryRequest {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Min(0)
    area: number;

    @IsEnum(Continent)
    continent: Continent;

    @IsNotEmpty()
    @MinLength(10)
    description: string;
}