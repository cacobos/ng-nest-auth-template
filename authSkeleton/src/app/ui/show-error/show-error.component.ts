import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-show-error',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './show-error.component.html',
    styleUrl: './show-error.component.scss',
})
export class ShowErrorComponent {
    show = input<boolean>();
    errors = input<ValidationErrors | null | undefined>();
}
