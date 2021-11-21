import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Country } from "../../../../entities/country.entity";
import { Guid } from "guid-typescript";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateCountryRequest } from "../../requests/update-country-request";
import { CreateCountryRequest } from "../../requests/create-country-request";

@Injectable()
export class CountriesService {
    constructor(@InjectRepository(Country) private readonly countryRepository: Repository<Country>) {}

    async getCountries(): Promise<Country[]> {
        return await this.countryRepository.find();
    }

    async getCountry(id: Guid): Promise<Country> {
        return await this.countryRepository.findOne({ where: { id } });
    }

    async createCountry(createRequest: CreateCountryRequest): Promise<Country> {
        const { name, area, continent, description } = createRequest;

        const createdCountry: Country = await this.countryRepository.create({
            name, area, continent, description
        });

        await this.countryRepository.save(createdCountry);

        return createdCountry;
    }

    async updateCountry(id: Guid, updateRequest: UpdateCountryRequest): Promise<Country> {
        const storedCountry = await this.getCountry(id);

        if (!storedCountry) {
            throw new HttpException(`Country with id ${id} not found`, HttpStatus.BAD_REQUEST);
        }

        await this.countryRepository.update({ id }, updateRequest);

        return await this.getCountry(storedCountry.id);
    }

    async deleteCountry(id: Guid): Promise<Country> {
        const storedCountry = await this.getCountry(id);

        if (!storedCountry) {
            throw new HttpException(`Country with id ${id} not found`, HttpStatus.BAD_REQUEST);
        }

        await this.countryRepository.delete({ id });

        return storedCountry;
    }
}
