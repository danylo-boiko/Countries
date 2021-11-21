import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { CountriesService } from "../../services/countries/countries.service";
import { ValidationPipe } from "../../../../pipes/validation.pipe";
import { Country } from "../../../../entities/country.entity";
import { UpdateCountryRequest } from "../../requests/update-country-request";
import { CreateCountryRequest } from "../../requests/create-country-request";
import { AuthGuard } from "@nestjs/passport";

@Controller('countries')
export class CountriesController {
    constructor(private countriesService: CountriesService) {}

    @Get()
    public getCountries(): Promise<Country[]> {
        return this.countriesService.getCountries();
    }

    @Get(':id')
    public getCountry(@Param('id', ParseUUIDPipe) id): Promise<Country> {
        return this.countriesService.getCountry(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    public createCountry(@Body(new ValidationPipe()) createRequest: CreateCountryRequest): Promise<Country> {
        return this.countriesService.createCountry(createRequest);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    public updateCountry(@Param('id', ParseUUIDPipe) id, @Body(new ValidationPipe()) updateRequest: UpdateCountryRequest): Promise<Country> {
        return this.countriesService.updateCountry(id, updateRequest);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    public deleteCountry(@Param('id', ParseUUIDPipe) id): Promise<Country> {
        return this.countriesService.deleteCountry(id);
    }
}
