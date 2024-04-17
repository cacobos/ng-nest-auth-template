import { Routes } from '@angular/router';
import { authGuard } from '@core/common/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('../../layout/main-layout/main-layout.component').then(
                (m) => m.MainLayoutComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('../../feature/home/home.component').then(
                        (m) => m.HomeComponent
                    ),
            },
            {
                path: 'profile',
                loadComponent: () =>
                    import('@feature/profile/profile.component').then(
                        (m) => m.ProfileComponent
                    ),
            },
            {
                path: 'admin',
                loadComponent: () =>
                    import('@feature/admin/admin.component').then(
                        (m) => m.AdminComponent
                    ),
                // only for admin
                canActivate: [authGuard],
                data: {
                    roles: ['ROLE_ADMIN'],
                },
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import(
                                '@pattern/user-management/user-management.component'
                            ).then((m) => m.UserManagementComponent),
                    },
                ],
            },
        ],
    },
];
