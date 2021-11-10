import { Component, OnInit } from '@angular/core';
import { Country } from "../../../models/country";
import { CountryService } from "../../../services/country.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-update-country',
  templateUrl: './update-country.component.html',
  styleUrls: ['./update-country.component.scss']
})
export class UpdateCountryComponent implements OnInit {
  public updateCountry: Country | undefined;

  constructor(private countryService: CountryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const countryId = this.route.snapshot.params['id'];

    this.countryService.getCountry(countryId).subscribe(
      country => this.updateCountry = country
    );
  }
}
