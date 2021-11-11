import { Component, OnInit } from '@angular/core';
import { Country } from "../../../models/country";
import { CountryService } from "../../../services/country.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Continent } from "../../../enums/continent";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-update-country',
  templateUrl: './update-country.component.html',
  styleUrls: ['./update-country.component.scss']
})
export class UpdateCountryComponent implements OnInit {
  public continents = Object.entries(Continent).map(([key, value]) => ({ key, value }));
  public updateCountryForm!: FormGroup;
  public storedCountry!: Country;

  constructor(private countryService: CountryService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const countryId = this.activatedRoute.snapshot.params['id'];

    this.countryService.getCountry(countryId).subscribe(
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
      name: this.updateCountryForm.value.name,
      area: this.updateCountryForm.value.area,
      continent: this.updateCountryForm.value.continent,
      description: this.updateCountryForm.value.description
    };

    this.countryService.updateCountry(updatedCountry).subscribe(_ => {
      this.router.navigate(['/countries']);
    });
  }

  isFieldValid(componentName?: string, ruleName?: string): boolean {
    if (!componentName) {
      return this.updateCountryForm.valid;
    }

    const component: AbstractControl = this.updateCountryForm.get(componentName)!;

    if (!ruleName) {
      return component.valid || component.untouched;
    }

    return !component.hasError(ruleName) || component.untouched;
  }
}
