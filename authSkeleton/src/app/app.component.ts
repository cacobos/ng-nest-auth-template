import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TranslateModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'hoopSuite';
    constructor(public translate: TranslateService) {
        translate.addLangs(['es', 'en']);
        translate.setDefaultLang('es');

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang?.match(/es|en/) ? browserLang : 'es');
    }
}
