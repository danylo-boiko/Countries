import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Country } from "../../entities/country.entity";
import { CountriesController }  from "./controllers/countries/countries.controller";
import { CountriesService } from "./services/countries/countries.service";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        UsersModule,
        AuthModule,
        TypeOrmModule.forFeature([Country])
    ],
    controllers: [CountriesController],
    providers: [CountriesService]
})
export class CountriesModule {}
