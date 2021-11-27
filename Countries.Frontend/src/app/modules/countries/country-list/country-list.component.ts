import { Component, DoCheck, OnInit } from '@angular/core';
import { Country } from "../../../models/country.model";
import { CountriesService } from "../../../services/countries/countries.service";
import { Guid } from "guid-typescript";
import { Router } from "@angular/router";

@Component({
    selector: 'app-country-list',
    templateUrl: './country-list.component.html',
    styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit, DoCheck {
    public countries: Country[] = [];

    constructor(private countriesService: CountriesService, private router: Router) {}

    ngOnInit(): void {
        this.countriesService.getCountries().subscribe(
            countries => this.countriesService.countries = countries
        );
    }

    ngDoCheck(): void {
        this.countries = this.countriesService.countries;
    }

    selectCountry(id: Guid) {
        this.router.navigate(['/countries/' + id]);
    }
}
