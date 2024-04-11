import { Injectable } from '@angular/core';
import { User } from '@core/auth/models/user';
import { Observable, of } from 'rxjs';

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
    getAllUsers(): Observable<User[]> {
        return of(users);
    }
}
