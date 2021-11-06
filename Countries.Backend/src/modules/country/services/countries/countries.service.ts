import { Injectable } from '@nestjs/common';
import { Country } from "../../../../entities/country.entity";
import { Guid } from "guid-typescript";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateCountryRequest } from "../../../../requests/UpdateCountryRequest";
import { CreateCountryRequest } from "../../../../requests/CreateCountryRequest";

@Injectable()
export class CountriesService {
    constructor(@InjectRepository(Country) private countryRepository: Repository<Country>) {}

    async getCountries(): Promise<Country[]> {
        return await this.countryRepository.find();
    }

    async getCountry(id: Guid): Promise<Country> {
        return await this.countryRepository.findOne({
            where: { id : id }
        });
    }

    async createCountry(createRequest: CreateCountryRequest): Promise<Country> {
        let storedCountry = new Country();

        storedCountry.name = createRequest.name;
        storedCountry.area = createRequest.area;
        storedCountry.continent = createRequest.continent;
        storedCountry.description = createRequest.description;
        await this.countryRepository.save(storedCountry);

        return await this.getCountry(storedCountry.id);
    }

    async updateCountry(id: Guid, updateRequest: UpdateCountryRequest): Promise<Country> {
        let storedCountry = await this.getCountry(id);

        storedCountry.name = updateRequest.name;
        storedCountry.area = updateRequest.area;
        storedCountry.continent = updateRequest.continent;
        storedCountry.description = updateRequest.description;
        await this.countryRepository.save(storedCountry);

        return await this.getCountry(storedCountry.id);
    }

    async deleteCountry(id: Guid) : Promise<Country> {
        let storedCountry = await this.getCountry(id);
        await this.countryRepository.remove(storedCountry);

        return storedCountry;
    }
}
