import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-error404',
    templateUrl: './error404.component.html',    
    styleUrls    : ['./error-404.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [AuthService]
})
export class Error404Component implements OnInit {

    private timeout: any;

    constructor(
        private fuseConfigService: FuseConfigService,
        private authService: AuthService,
        private router: Router
    ) {
        this.fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    ngOnInit() {

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.redirect();
    }

    private redirect() {
        if (this.authService.isAuthenticated()) {
            this.timeout = setTimeout(() => {
                this.router.navigate(['dashboard']);
            }, 2000);
        } else {
            this.timeout = setTimeout(() => {
                this.router.navigate(['login']);
            }, 2000);
        }
    }

}
