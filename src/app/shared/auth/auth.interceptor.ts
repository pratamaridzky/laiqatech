import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, flatMap, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { StorageService } from '../storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private authService: AuthService,
        private storageService: StorageService
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // let action = request.params.get('action');        
        if (
            request.params.get('action') === 'auth/logout' ||
            request.params.get('action') === 'auth/refresh' ||
            request.params.get('action') === 'auth/login'
        ) {
            return next.handle(request);
        } else {
            return next.handle(request).pipe(
                catchError(error => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 401) {
                            return this.authService.refreshToken().pipe(
                                flatMap(data => {
                                    if (data.token) {
                                        this.authService.setToken(data.token);
                                    } else {
                                        this.authService.logout();
                                        this.router.navigate(['login']);
                                        return throwError(error);
                                    }
                                    return next.handle(this.updateHeader(request));
                                })
                            );
                        } else {
                            if (error.url.endsWith('refresh')) {
                                this.authService.logout();
                                this.router.navigate(['login']);
                            }
                            return throwError(error);
                        }
                    }
                    return throwError(error);
                })
            );
        }
    }

    private updateHeader(request: HttpRequest<any>): HttpRequest<any> {
        const authToken = this.authService.getToken();
        request = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${authToken}`)
        });
        request = request.clone({
            headers: request.headers.set('Content-Type', 'application/json')
        });
        return request;
    }
}
