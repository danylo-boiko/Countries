import { Component, OnInit } from '@angular/core';
import { CountryService } from "../../../services/country.service";
import { Continent } from "../../../enums/continent";
import { Guid } from "guid-typescript";
import { Router } from "@angular/router";
import { Country } from "../../../models/country";

@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.scss']
})
export class CreateCountryComponent implements OnInit {
  public continents = Object.entries(Continent).map(([key, value]) => ({ key, value }));

  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {}

  createCountry(value: any) {
    const newCountry: Country = {
      id: Guid.create(),
      name: value.name,
      area: value.area,
      continent: value.continent,
      description: value.description
    };

    this.countryService.createCountry(newCountry).subscribe(res => {
      this.router.navigate(['/countries']);
    });
  }
}
