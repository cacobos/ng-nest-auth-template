import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { User } from '@core/auth/models/user';
import { UsersService } from './users.service';

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-management.component.html',
    styleUrl: './user-management.component.scss',
})
export class UserManagementComponent {
    usersService = inject(UsersService);
    users$ = this.usersService.getAllUsers();

    editUser(user: User) {
        console.log('Edit user', user);
    }

    deleteUser(user: User) {
        console.log('Delete user', user);
    }
}
