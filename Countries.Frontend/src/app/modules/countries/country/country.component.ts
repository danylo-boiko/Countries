import { Component, OnInit } from '@angular/core';
import { Country } from "../../../models/country.model";
import { CountriesService } from "../../../services/countries/countries.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Guid } from "guid-typescript";

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
    public country: Country | undefined;

    constructor(private countriesService: CountriesService, private activatedRoute: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        const countryId = this.activatedRoute.snapshot.params['id'];

        this.countriesService.getCountry(countryId).subscribe(
            country => {
                if (country) {
                    this.country = country;
                } else {
                    this.router.navigate(['/countries']);
                }
            }
        );
    }

    updateCountry(id: Guid) {
        this.router.navigate(['/countries/update/' + id]);
    }

    deleteCountry(id: Guid) {
        this.countriesService.deleteCountry(id).subscribe(_ => {
            this.router.navigate(['/countries']);
        })
    }

    goBack() {
        this.router.navigate(['/countries']);
    }
}
