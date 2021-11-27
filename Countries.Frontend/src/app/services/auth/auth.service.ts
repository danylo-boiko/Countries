import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public readonly baseUrl = "http://localhost:3000/api/auth";

    constructor(private httpClient: HttpClient) {}

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

    logout() {
        localStorage.removeItem('currentUserToken');
    }
}
