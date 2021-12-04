import { Injectable } from '@angular/core';
import { Country } from "../../models/country.model";
import { Guid } from "guid-typescript";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CountriesService {
    private apiBaseUri: string = 'http://localhost:3000/api/countries';
    public countries: Country[] = [];

    constructor(private http: HttpClient) {}

    getCountries(): Observable<any> {
        return this.http.get(this.apiBaseUri);
    }

    getCountry(id: Guid): Observable<any> {
        const path = `${this.apiBaseUri}/${id}`;
        return this.http.get(path);
    }

    createCountry(country: Country): Observable<any> {
        return this.http.post(this.apiBaseUri, country);
    }

    updateCountry(country: Country): Observable<any> {
        const path = `${this.apiBaseUri}/${country.id}`;
        return this.http.put(path, country);
    }

    deleteCountry(id: Guid): Observable<any> {
        const path = `${this.apiBaseUri}/${id}`;
        return this.http.delete(path);
    }
}
