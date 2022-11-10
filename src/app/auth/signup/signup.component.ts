import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
    maxDate: Date;

    constructor(private authService: AuthService) {
        this.maxDate = new Date();
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    }

    ngOnInit(): void {}

    onSubmit(signupform: NgForm) {
        this.authService.registerUser({
            email: signupform.value.email,
            password: signupform.value.password
        });
    }
}
