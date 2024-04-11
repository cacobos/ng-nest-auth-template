import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./layout/main-layout/main-layout.routes').then(
                (m) => m.routes
            ),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./core/auth/auth.routes').then((m) => m.routes),
    },
];
