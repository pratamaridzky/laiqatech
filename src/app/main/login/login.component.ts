import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { StorageService } from 'app/shared/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  
  constructor(
    private fuseConfigService: FuseConfigService,
    private formBuilder: FormBuilder,
    private splasScreen: FuseSplashScreenService,
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
    private storageService: StorageService) {
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

  ngOnInit():void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.storageService.clear();
    // this.authService.setCookies();
  }
  
  login(): void {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    const request = this.authService.login(username, password);

    request.subscribe(
        data => {
            if (data.title == 'Success') {
                this.splasScreen.show();
                this.authService.setToken(data.data.token);
                setTimeout(() => {
                    this.router.navigate(['master']);
                }, 2000);
            }
        },
        error => {
            this.openSnackBar(error.error.message, 'close');
        }
    );
  }

  openSnackBar(message: string, action: string): void {
      this.snackBar.open(message, action, {
          duration: 4000,
          panelClass: ['snackbar-failed']
      });
  }

  ngOnDestroy(): void {
      setTimeout(() => {
          this.splasScreen.hide();
      }, 3500);
  }

}
