import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '@core/auth/models/user';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.api_url;
const USERS_PATH = '/users';
const AUTH_PATH = '/auth';
const SIGNUP_PATH = '/signup';
const RESET_PASSWORD_PATH = '/reset-password';

const users: User[] = [
    {
        username: 'usuario 1',
        roles: ['admin'],
        password: '123456',
    },
    {
        username: 'usuario 2',
        roles: ['user'],
        password: '123456',
    },
    {
        username: 'usuario 3',
        roles: ['user'],
        password: '123456',
    },
    {
        username: 'usuario 4',
        roles: ['user'],
        password: '123456',
    },
    {
        username: 'usuario 5',
        roles: ['user'],
        password: '123456',
    },
];
@Injectable({
    providedIn: 'root',
})
export class UsersService {
    http = inject(HttpClient);
    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${API_URL}${USERS_PATH}`);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(
            `${API_URL}${AUTH_PATH}${SIGNUP_PATH}`,
            user
        );
    }

    deleteUser(user: User): Observable<void> {
        return this.http.delete<void>(
            `${API_URL}${USERS_PATH}/${user.username}`
        );
    }

    resetPassword(user: User): Observable<void> {
        return this.http.put<void>(
            `${API_URL}${AUTH_PATH}${RESET_PASSWORD_PATH}/${user.username}`,
            {}
        );
    }
}
