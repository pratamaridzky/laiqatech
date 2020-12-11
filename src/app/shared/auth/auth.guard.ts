import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { StorageService } from '../storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router,
        private storageService: StorageService
    ) {}

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.storageService.remove('token');
            this.storageService.remove('tokenID');
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
