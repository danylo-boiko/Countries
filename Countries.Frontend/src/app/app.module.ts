import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from "@angular/router";
import { CountriesModule } from "./modules/countries/countries.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { AuthModule } from "./modules/auth/auth.module";

const routes: Routes = [
    { path: '', component: HomeComponent },
]

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        RouterModule.forRoot(routes),
        CountriesModule,
        AuthModule,
        MatToolbarModule,
        MatButtonModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}
