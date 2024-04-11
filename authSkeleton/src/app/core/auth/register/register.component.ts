import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ShowErrorComponent } from '@ui/index';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, ShowErrorComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    private readonly router = inject(Router);

    form = new FormGroup({
        username: new FormControl<string>('', Validators.required),
        password: new FormControl<string>('', Validators.required),
    });

    login() {
        if (this.form.invalid) {
            return;
        }
        this.router.navigate(['/']);
    }
}
