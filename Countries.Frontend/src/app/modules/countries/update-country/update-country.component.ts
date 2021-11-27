import { Component, OnInit } from '@angular/core';
import { Country } from "../../../models/country.model";
import { CountriesService } from "../../../services/countries/countries.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Continent } from "../../../enums/continent.enum";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { isFormFieldValid } from "../../../helpers/formFieldValidationHelper";

@Component({
    selector: 'app-update-country',
    templateUrl: './update-country.component.html',
    styleUrls: ['./update-country.component.scss']
})
export class UpdateCountryComponent implements OnInit {
    public continents = Object.entries(Continent).map(([key, value]) => ({ key, value }));
    public updateCountryForm!: FormGroup;
    public storedCountry!: Country;
    public error: string = "";

    constructor(private countriesService: CountriesService, private activatedRoute: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        const countryId = this.activatedRoute.snapshot.params['id'];

        this.countriesService.getCountry(countryId).subscribe(
            country => {
                if (country) {
                    this.storedCountry = country

                    this.updateCountryForm = new FormGroup({
                        name: new FormControl(this.storedCountry.name, Validators.required),
                        area: new FormControl(this.storedCountry.area, [Validators.required, Validators.min(0)]),
                        continent: new FormControl(this.storedCountry.continent, Validators.required),
                        description: new FormControl(this.storedCountry.description, [Validators.required, Validators.minLength(10)])
                    });
                } else {
                    this.router.navigate(['/countries']);
                }
            }
        );
    }

    updateCountry() {
        const updatedCountry: Country = {
            id: this.storedCountry.id,
            ...this.updateCountryForm.value
        };

        this.countriesService.updateCountry(updatedCountry).subscribe(_ => {
            this.router.navigate(['/countries']);
        }, error => {
            this.error = error.error.message;
        });
    }

    isFieldValid(componentName?: string, ruleName?: string) {
        return isFormFieldValid(this.updateCountryForm, componentName, ruleName);
    }
}
