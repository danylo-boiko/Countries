import { IsEnum, IsNotEmpty } from "class-validator";
import { Continent } from "../enums/continent";

export class CreateCountryRequest {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    area: number;

    @IsEnum(Continent)
    continent: Continent;

    @IsNotEmpty()
    description: string;
}