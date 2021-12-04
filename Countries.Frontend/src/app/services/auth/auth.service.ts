import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public readonly baseUrl = "http://localhost:3000/api/auth";

    constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) {}

    login(username: string, password: string) {
        return this.httpClient.post<any>(`${this.baseUrl}/login`, { username, password })
            .pipe(map(response => {
                if (response.success) {
                    localStorage.setItem('currentUserToken', JSON.stringify(response.accessToken));
                }
                return response;
            }));
    }

    register(username: string, password: string) {
        return this.httpClient.post<any>(`${this.baseUrl}/register`, { username, password })
            .pipe(map(response => {
                if (response.success) {
                    localStorage.setItem('currentUserToken', JSON.stringify(response.accessToken));
                }
                return response;
            }));
    }

    isUserValid(): boolean{
        const token = JSON.parse(<string>localStorage.getItem('currentUserToken'));

        if(token){
            return !this.jwtHelper.isTokenExpired(token);
        }

        return false;
    }

    logout(): void {
        localStorage.removeItem('currentUserToken');
    }
}
