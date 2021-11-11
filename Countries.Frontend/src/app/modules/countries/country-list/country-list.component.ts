import { Component, DoCheck, OnInit } from '@angular/core';
import { Country } from "../../../models/country";
import { CountryService } from "../../../services/country.service";
import { Guid } from "guid-typescript";
import { Router } from "@angular/router";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit, DoCheck {
  public countries: Country[] = [];

  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(
      countries => this.countryService.countries = countries
    );
  }

  ngDoCheck(): void {
    this.countries = this.countryService.countries;
  }

  selectCountry(id: Guid) {
    this.router.navigate(['/countries/' + id]);
  }
}
