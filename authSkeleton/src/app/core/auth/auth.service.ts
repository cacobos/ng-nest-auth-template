import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.development';
import { Observable, catchError, take, tap, throwError } from 'rxjs';
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
        const token = localStorage.getItem('x-token');
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
                    take(1),
                    tap((res) => {
                        this.loggedUser.set(res.user);
                        localStorage.setItem('x-token', res.token);
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

    login(email: string, password: string): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(
                `${this.API_URL}${this.AUTH_PATH}${this.LOGIN_PATH}`,
                {
                    email,
                    password,
                }
            )
            .pipe(
                tap(
                    (res) => {
                        this.loggedUser.set(res.user);
                        localStorage.setItem(
                            'x-token',
                            JSON.stringify(res.token)
                        );
                        console.log('User logged in', {
                            user: res.user,
                            token: res.token,
                        });
                        this.router.navigate(['/']);
                    },
                    (error) => {
                        alert('Invalid email or password');
                        localStorage.removeItem('x-token');
                        throw error;
                    }
                )
            );
    }

    logout() {
        this.loggedUser.set(undefined);
    }

    getUsers() {
        console.log(this.API_URL);
        return this.http.get<User[]>(`${this.API_URL}/users`);
    }
}
