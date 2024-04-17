import {
    Component,
    OnDestroy,
    inject,
    output,
    viewChildren,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ROLES, User } from '@core/auth/models/user';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
    selector: 'app-create-user',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.scss',
})
export class CreateUserComponent implements OnDestroy {
    usersService = inject(UsersService);
    fb = inject(FormBuilder);

    userCreated = output<void>();
    onDestroy$ = new Subject<void>();

    checkboxes = viewChildren<HTMLInputElement>('input[type="checkbox"]');

    form = this.fb.nonNullable.group({
        username: this.fb.nonNullable.control('', Validators.required),
        password: this.fb.nonNullable.control('', Validators.required),
        roles: this.fb.nonNullable.control<string[]>(
            [] as string[],
            Validators.required
        ),
    });

    roles = Object.values(ROLES).map((role) => ({
        label: role,
        value: role,
    }));

    onRoleChange(value: string, event: Event) {
        const checked = (event.target as HTMLInputElement).checked;
        const roles = this.form.get('roles');
        console.log('roles', roles);
        if (!roles) {
            return;
        }
        const values = roles.value as string[];
        if (checked) {
            values.push(value);
        } else {
            const index = values.indexOf(value);
            if (index !== -1) {
                values.splice(index, 1);
            }
        }
        roles.setValue(values);
    }

    onSubmit() {
        const { username, password, roles } = this.form.value;
        const user: User = {
            username: username as string,
            password: password as string,
            roles: roles as string[],
        };
        this.usersService
            .createUser(user)
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(() => {
                this.resetForm();
                this.userCreated.emit();
            });
    }

    resetForm() {
        this.form.reset();
        this.form.get('roles')?.setValue([]);
        console.log(this.checkboxes());
        // this.checkboxes().forEach((checkbox) => {
        //     checkbox.checked = false;
        // });
        console.log('value', this.form.value);
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}
