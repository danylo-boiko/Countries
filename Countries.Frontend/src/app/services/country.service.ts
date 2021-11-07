import { Injectable } from '@angular/core';
import { Country } from "../models/country";
import { Guid } from "guid-typescript";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiBaseUri: string = 'http://localhost:3000';
  public countries: Country[] = [];

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    const path = `${this.apiBaseUri}/countries`;
    return this.http.get(path);
  }

  getCountry(id: Guid): Observable<any> {
    const path = `${this.apiBaseUri}/countries/${id}`;
    return this.http.get(path);
  }
}
