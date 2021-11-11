import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CountryListComponent } from "./country-list/country-list.component";
import { CountryComponent } from "./country/country.component";
import { BrowserModule } from "@angular/platform-browser";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { CreateCountryComponent } from './create-country/create-country.component';
import { UpdateCountryComponent } from './update-country/update-country.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


const routes: Routes = [
  { path: 'countries', component: CountryListComponent },
  { path: 'countries/create', component: CreateCountryComponent },
  { path: 'countries/:id', component: CountryComponent },
  { path: 'countries/update/:id', component: UpdateCountryComponent }
]

@NgModule({
  declarations: [
    CountryComponent,
    CountryListComponent,
    CreateCountryComponent,
    UpdateCountryComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forChild(routes),
        MatListModule,
        MatCardModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],
  exports: [
    RouterModule
  ]
})

export class CountriesModule {}
