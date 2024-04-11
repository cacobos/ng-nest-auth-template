import { Routes } from '@angular/router';

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
                path: 'admin',
                loadComponent: () =>
                    import('../../feature/admin/admin.component').then(
                        (m) => m.AdminComponent
                    ),
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
