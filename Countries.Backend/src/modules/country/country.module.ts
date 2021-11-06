import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Country } from "../../entities/country.entity";
import { CountriesController }  from "./controllers/countries/countries.controller";
import { CountriesService } from "./services/countries/countries.service";

@Module({
    imports: [TypeOrmModule.forFeature([Country])],
    controllers: [CountriesController],
    providers: [CountriesService]
})
export class CountryModule {}
