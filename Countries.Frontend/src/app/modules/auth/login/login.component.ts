import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { isFormFieldValid } from "../../../helpers/formFieldValidationHelper";
import { AuthService } from "../../../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;
    public error: string = "";

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(32)
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(100)
            ])
        });
    }

    login() {
        const { username, password } = this.loginForm.value;
        this.authService.login(username, password).subscribe(_ => {
            this.router.navigate(['/']);
        }, error => {
            this.error = error.error.message;
        });
    }

    isFieldValid(componentName?: string, ruleName?: string) {
        return isFormFieldValid(this.loginForm, componentName, ruleName);
    }
}
