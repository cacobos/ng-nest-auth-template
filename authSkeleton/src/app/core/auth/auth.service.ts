import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.development';
import { catchError, of, switchMap, tap, throwError } from 'rxjs';
import { ChangePasswordData, LoginResponse, User } from './models/user';

const API_URL = environment.api_url;
const AUTH_PATH = '/auth';
const LOGIN_PATH = '/login';
const RESET_PASSWORD_PATH = '/reset-password';
const CHANGE_PASSWORD_PATH = '/change-password';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    http = inject(HttpClient);
    private router = inject(Router);

    loggedUser = signal<User | undefined>(undefined);

    constructor() {}

    refresh() {
        const token = localStorage.getItem('x-token');
        if (token) {
            return this.http
                .get<LoginResponse>(`${API_URL}${AUTH_PATH}/refresh`)
                .pipe(
                    tap((res) => {
                        this.loggedUser.set(res.user);
                        localStorage.setItem('x-token', res.accessToken);
                    }),
                    catchError((error) => {
                        localStorage.removeItem('x-token');
                        return throwError(error);
                    }),
                    switchMap(() => of(Boolean(this.loggedUser())))
                );
        }
        return of(false);
    }

    login(username: string, password: string) {
        this.http
            .post<LoginResponse>(`${API_URL}${AUTH_PATH}${LOGIN_PATH}`, {
                username,
                password,
            })
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
        return this.http.get<User[]>(`${API_URL}/users`);
    }

    resetPassword(user: User) {
        return this.http.get(
            `${API_URL}${AUTH_PATH}${RESET_PASSWORD_PATH}${user.username}`
        );
    }

    changePassword(changePasswordData: ChangePasswordData) {
        return this.http.post(
            `${API_URL}${AUTH_PATH}${CHANGE_PASSWORD_PATH}`,
            changePasswordData
        );
    }
}
