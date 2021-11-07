import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CountryListComponent } from "./country-list/country-list.component";
import { CountryComponent } from "./country/country.component";
import { BrowserModule } from "@angular/platform-browser";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

const routes: Routes = [
  {path: 'countries', component: CountryListComponent},
  {path: 'countries/:id', component: CountryComponent}
]

@NgModule({
  declarations: [
    CountryComponent,
    CountryListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routes),
    MatListModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    RouterModule
  ]
})

export class CountriesModule { }
