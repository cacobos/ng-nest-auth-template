import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.development';
import { catchError, tap, throwError } from 'rxjs';
import { LoginResponse, User } from './models/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    API_URL = environment.api_url;
    AUTH_PATH = '/auth';
    LOGIN_PATH = '/login';

    http = inject(HttpClient);
    private router = inject(Router);

    loggedUser = signal<User | undefined>(undefined);

    constructor() {
        const token = localStorage.getItem('x-token')?.replace(/"/g, '');
        if (token) {
            this.http
                .get<LoginResponse>(
                    `${this.API_URL}${this.AUTH_PATH}/refresh`,
                    {
                        headers: {
                            'x-token': token,
                        },
                    }
                )
                .pipe(
                    tap((res) => {
                        this.loggedUser.set(res.user);
                        localStorage.setItem('x-token', res.accessToken);
                        this.router.navigate(['/']);
                    }),
                    catchError((error) => {
                        localStorage.removeItem('x-token');
                        return throwError(error);
                    })
                )
                .subscribe();
        }
    }

    login(username: string, password: string) {
        this.http
            .post<LoginResponse>(
                `${this.API_URL}${this.AUTH_PATH}${this.LOGIN_PATH}`,
                {
                    username,
                    password,
                }
            )
            .pipe(
                tap(
                    (res) => {
                        this.loggedUser.set(res.user);
                        localStorage.setItem('x-token', res.accessToken);
                        this.router.navigate(['/']);
                    },
                    (error) => {
                        alert('Invalid email or password');
                        localStorage.removeItem('x-token');
                        throw error;
                    }
                )
            )
            .subscribe();
    }

    logout() {
        this.loggedUser.set(undefined);
    }

    getUsers() {
        return this.http.get<User[]>(`${this.API_URL}/users`);
    }
}
