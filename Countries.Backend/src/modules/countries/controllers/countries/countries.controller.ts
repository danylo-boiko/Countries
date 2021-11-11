import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UsePipes } from '@nestjs/common';
import { CountriesService } from "../../services/countries/countries.service";
import { CountryValidationPipe } from "../../../../pipes/country-validation.pipe";
import { Country } from "../../../../entities/country.entity";
import { UpdateCountryRequest } from "../../../../requests/UpdateCountryRequest";
import { CreateCountryRequest } from "../../../../requests/CreateCountryRequest";

@Controller('countries')
export class CountriesController {
    constructor(private countriesService: CountriesService) {}

    @Get()
    getCountries(): Promise<Country[]> {
        return this.countriesService.getCountries();
    }

    @Get(':id')
    getCountry(@Param('id', ParseUUIDPipe) id): Promise<Country> {
        return this.countriesService.getCountry(id);
    }

    @Post()
    createCountry(@Body(new CountryValidationPipe()) createRequest: CreateCountryRequest): Promise<Country> {
        return this.countriesService.createCountry(createRequest);
    }

    @Put(':id')
    updateCountry(@Param('id', ParseUUIDPipe) id, @Body(new CountryValidationPipe()) updateRequest: UpdateCountryRequest): Promise<Country> {
        return this.countriesService.updateCountry(id, updateRequest);
    }

    @Delete(':id')
    deleteCountry(@Param('id', ParseUUIDPipe) id): Promise<Country> {
        return this.countriesService.deleteCountry(id);
    }
}
