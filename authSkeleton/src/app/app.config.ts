import { ApplicationConfig } from '@angular/core';

import { routes } from './app.routes';
import { provideCore } from './core/core';

export const appConfig: ApplicationConfig = {
    // override AuthService with FakeAuthService
    providers: [provideCore({ routes })],
};
