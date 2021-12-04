import { Component } from '@angular/core';
import { AuthService } from "./services/auth/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'Countries';

    constructor(private authService: AuthService) {}

    isUserValid(): boolean {
        return this.authService.isUserValid();
    }

    logout() : void {
        this.authService.logout();
    }
}
