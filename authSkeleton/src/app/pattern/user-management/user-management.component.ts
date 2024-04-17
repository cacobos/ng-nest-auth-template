import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { User } from '@core/auth/models/user';
import { Subject, takeUntil } from 'rxjs';
import { CreateUserComponent } from './create-user/create-user.component';
import { UsersService } from './users.service';

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [CommonModule, CreateUserComponent],
    templateUrl: './user-management.component.html',
    styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnDestroy {
    usersService = inject(UsersService);
    users$ = this.usersService.getAllUsers();

    onDestroy$ = new Subject<void>();

    resetPassword(user: User) {
        this.usersService
            .resetPassword(user)
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(() => {
                this.users$ = this.usersService.getAllUsers();
            });
    }

    deleteUser(user: User) {
        this.usersService.deleteUser(user).subscribe(() => {
            this.users$ = this.usersService.getAllUsers();
        });
    }

    onUserCreated() {
        this.users$ = this.usersService.getAllUsers();
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}
