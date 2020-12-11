import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'app/app.settings';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../storage.service';
import { CookieService } from 'ngx-cookie-service';
import { interval, Observable, BehaviorSubject, pipe, Subject } from 'rxjs';
import * as moment from 'moment';
import { User, Auth } from './auth';
import { log } from 'console';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user = new Subject<User>();
    private settings = new AppSettings();

    constructor(
        private http: HttpClient,
        private storage: StorageService,
        private cookieService: CookieService,
        private JWTHelper: JwtHelperService
    ) {}

    /**
     *
     * @param username string
     * @param password string
     * @returns void
     *
     */
    public login(username: string, password: string): Observable<Auth> {
        return this.http.post<Auth>(
            this.settings.getApiEndpoint('auth'),
            {
                username: username,
                password: password,
                appID: 'laiqatech'
            }
        );
    }

    /**
     * setCookies
     */
    public setCookies(): any {
        return this.http
            .post(this.settings.getApiEndpoint('auth') + '/setCookie', null, {
                withCredentials: false
            })
            .subscribe(response => {
                console.log(response);
                this.cookieService.set('XSRF-TOKEN', response.toString());
            });
    }

    /**
     * logout
     */
    public logout(): void {
        localStorage.clear();
    }

    /**
     *
     * @param token
     * get token
     */
    public setToken(token: string): void {
        if (token) {
            const decodeToken = this.decodeToken(token);
            this.storage.set('token', token);          
            this.storage.set('tokenID', decodeToken.tokenID);
            Object.keys(decodeToken.data).forEach(val => {
                this.storage.set(val, decodeToken.data[val]);
            });
        }
    }

    /**
     * getToken
     */
    public getToken(): string {
        return this.storage.get('token');
    }

    /**
     * decodeToken
     * @param token string
     */
    public decodeToken(token: string): any {
        const response = { data: null, tokenID: null };
        if (token) {
            const decoded = this.JWTHelper.decodeToken(token);
            response.data = decoded.data;
            response.tokenID = decoded.jti;
        }
        return response;
    }

    /**
     * isAuthenticated
     * @returns boolean
     */
    public isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        return true;
    }

    /**
     * isTokenExpired
     */
    public tokenWillExpire(): any {
        const date = moment();
        const token = this.getToken();
        let expireInMinutes = null;
        if (token) {
            const tokenWillExpire = moment(
                this.JWTHelper.getTokenExpirationDate(token)
            );
            expireInMinutes = tokenWillExpire.diff(date, 'minutes');
        }
        return expireInMinutes;
    }

    public isSessionExpired(): boolean {
        const token = this.getToken();
        return this.JWTHelper.isTokenExpired(token);
    }

    /**
     * refreshToken
     */
    public refreshToken(): Observable<any> {
        return this.http.post<any>(
            this.settings.getApiEndpoint('auth') + '/refreshToken',
            {
                tokenID: this.storage.get('tokenID'),
                appID: 'evaluation'
            }
        );
    }
}
