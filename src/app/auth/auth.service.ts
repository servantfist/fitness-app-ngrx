import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import { User } from './user.model';


@Injectable({
    providedIn: 'root',
})
export class AuthService {

    authChange = new Subject<boolean>();
    private user: User | null;

    constructor(private router: Router) {
        this.user = null;
    }

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString(),
        };
        this.authSuccess();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString(),
        };
        this.authSuccess();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        return { ...this.user };
    }

    isAuth() {
        return this.user != null;
    }

    private authSuccess() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}
