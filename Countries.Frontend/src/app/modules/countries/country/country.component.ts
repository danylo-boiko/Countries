import { Component, OnInit } from '@angular/core';
import { Country } from "../../../models/country";
import { CountryService } from "../../../services/country.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  public country: Country | undefined;

  constructor(private countryService: CountryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const countryId = this.route.snapshot.params['id'];
    this.countryService.getCountry(countryId).subscribe(
      country => this.country = country
    );
  }

  goBack(){
    this.router.navigate(['/countries']);
  }
}
