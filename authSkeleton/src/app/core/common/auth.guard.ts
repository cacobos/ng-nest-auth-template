import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const roles = route.data['roles'];
    const loggedUser = authService.loggedUser();
    const hasRole =
        !roles ||
        roles?.every((role: string) => loggedUser?.roles.includes(role));
    if (loggedUser && hasRole) {
        return true;
    }
    if (hasRole) {
        const isLogged = await authService.refresh().toPromise();
        if (isLogged) {
            return true;
        }
    }
    router.navigate(['/auth']);
    return false;
};
