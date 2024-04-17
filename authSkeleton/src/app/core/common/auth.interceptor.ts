import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('x-token');
    if (token) {
        req = req.clone({
            setHeaders: {
                authorization: token,
            },
        });
    }
    return next(req);
};
