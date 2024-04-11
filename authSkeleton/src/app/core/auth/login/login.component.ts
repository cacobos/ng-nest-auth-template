import { Component, OnDestroy, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ShowErrorComponent } from '@ui/index';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, ShowErrorComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
    private readonly router = inject(Router);
    private readonly authService = inject(AuthService);

    form = new FormGroup({
        username: new FormControl<string>('', Validators.required),
        password: new FormControl<string>('', Validators.required),
    });

    private readonly onDestroy$ = new Subject<void>();

    login() {
        if (this.form.invalid) {
            return;
        }
        this.router.navigate(['/']);
        this.authService
            .login('', '')
            .pipe(takeUntil(this.onDestroy$))
            .subscribe();
    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}
