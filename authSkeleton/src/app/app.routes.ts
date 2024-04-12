import { Routes } from '@angular/router';
import { authGuard } from '@core/common/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./layout/main-layout/main-layout.routes').then(
                (m) => m.routes
            ),
        canActivate: [authGuard],
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./core/auth/auth.routes').then((m) => m.routes),
    },
];
