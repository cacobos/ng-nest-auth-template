import { Component, OnDestroy, inject } from '@angular/core';
import {
    AbstractControl,
    AbstractControlOptions,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';

const PasswordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    return null;
};

interface ValidatorFn {
    (control: AbstractControl): ValidationErrors | null;
}

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnDestroy {
    authService = inject(AuthService);
    user = this.authService.loggedUser;
    form = new FormGroup(
        {
            oldPassword: new FormControl('', Validators.required),
            repeatPassword: new FormControl('', Validators.required),
            newPassword: new FormControl('', Validators.required),
            // checkPasswords: this.checkPasswords,
        },
        { validators: PasswordValidator } as AbstractControlOptions
    );

    destroyed$ = new Subject<void>();

    changePassword() {
        if (!this.user()) {
            return;
        }
        this.authService
            .changePassword({
                username: this.user()!.username,
                oldPassword: this.form.get('oldPassword')!.value as string,
                newPassword: this.form.get('newPassword')!.value as string,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    passwordValidator: ValidatorFn = (
        control: AbstractControl
    ): ValidationErrors | null => {
        const password = control.get('password');
        const confirmpassword = control.get('confirmPassword');
        if (
            password &&
            confirmpassword &&
            password.value != confirmpassword.value
        ) {
            return {
                passwordmatcherror: true,
            };
        }
        return null;
    };

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
