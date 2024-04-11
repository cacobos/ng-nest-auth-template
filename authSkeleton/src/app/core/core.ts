import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
    Routes,
    provideRouter,
    withComponentInputBinding,
    withEnabledBlockingInitialNavigation,
    withInMemoryScrolling,
    withRouterConfig,
} from '@angular/router';
import { authInterceptor } from './common/auth.interceptor';

export interface CoreOptions {
    routes: Routes;
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