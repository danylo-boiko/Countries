import { Component, OnInit } from '@angular/core';
import { CountriesService } from "../../../services/countries/countries.service";
import { Continent } from "../../../enums/continent.enum";
import { Guid } from "guid-typescript";
import { Router } from "@angular/router";
import { Country } from "../../../models/country.model";

@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.scss']
})
export class CreateCountryComponent implements OnInit {
  public continents = Object.entries(Continent).map(([key, value]) => ({ key, value }));

  constructor(private countriesService: CountriesService, private router: Router) {}

  ngOnInit(): void {}

  createCountry(value: any) {
    const newCountry: Country = {
      id: Guid.create(),
      name: value.name,
      area: value.area,
      continent: value.continent,
      description: value.description
    };

    this.countriesService.createCountry(newCountry).subscribe(_ => {
      this.router.navigate(['/countries']);
    });
  }
}
