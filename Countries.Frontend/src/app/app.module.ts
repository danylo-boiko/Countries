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
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";

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
        },
        {
            provide: JWT_OPTIONS,
            useValue: JWT_OPTIONS
        },
        JwtHelperService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}
