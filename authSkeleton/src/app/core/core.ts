import {
    HttpClient,
    provideHttpClient,
    withInterceptors,
} from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
    Routes,
    provideRouter,
    withComponentInputBinding,
    withEnabledBlockingInitialNavigation,
    withInMemoryScrolling,
    withRouterConfig,
} from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { authInterceptor } from './common/auth.interceptor';

export interface CoreOptions {
    routes: Routes;
}

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}

export function provideCore({ routes }: CoreOptions) {
    return [
        provideAnimationsAsync(),
        provideRouter(
            routes,
            withRouterConfig({
                onSameUrlNavigation: 'reload',
            }),
            withComponentInputBinding(),
            withEnabledBlockingInitialNavigation(),
            withInMemoryScrolling({
                anchorScrolling: 'enabled',
                scrollPositionRestoration: 'enabled',
            })
        ),
        provideHttpClient(withInterceptors([authInterceptor])),

        importProvidersFrom(
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
            })
        ),

        // other 3rd party libraries providers like NgRx, provideStore()

        // other application specific providers and setup

        // perform initialization, has to be last
        {
            provide: ENVIRONMENT_INITIALIZER,
            multi: true,
            useValue() {
                // add init logic here...
                // kickstart processes, trigger initial requests or actions, ...
            },
        },
    ];
}
