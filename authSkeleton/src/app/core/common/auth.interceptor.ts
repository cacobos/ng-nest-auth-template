import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('x-token')?.replace(/"/g, '');
    if (token) {
        req = req.clone({
            setHeaders: {
                authorization: `Bearer ${token}`,
            },
        });
    }
    return next(req);
};
