import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth/auth.service";
import { isFormFieldValid } from "../../../helpers/formFieldValidationHelper";
import { Router } from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public registerForm!: FormGroup;
    public error: string = "";

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.registerForm = new FormGroup({
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

    register() {
        const { username, password } = this.registerForm.value;
        this.authService.register(username, password).subscribe(_ => {
            this.router.navigate(['/']);
        }, error => {
            this.error = error.error.message;
        });
    }

    isFieldValid(componentName?: string, ruleName?: string) {
        return isFormFieldValid(this.registerForm, componentName, ruleName);
    }
}
