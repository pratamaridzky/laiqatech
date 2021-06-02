import { Component, OnInit, OnDestroy} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as indonesia } from './i18n/id';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  animations: fuseAnimations
})

export class MasterComponent implements OnInit, OnDestroy {
  unsubscribeAll = new Subject();
  titleSubject = new Subject<string>();
  title = "";

  constructor(
    private splaceScreen: FuseSplashScreenService,
    private _fuseSidebarService: FuseSidebarService,
    public router: Router,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService
  ) { 
    this._fuseTranslationLoaderService.loadTranslations(english, indonesia);
    this.router.events
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(nav => {
          if (nav instanceof NavigationEnd) {
            
          }
      });

    this.titleSubject
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(title => {
          this.title = title;
      });
}

  ngOnInit() {
    this.splaceScreen.hide();
    this.toCompany();
  }

  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  toBrand(): void {
    this.router.navigate(["master/brand"]);
  }

  toCompany():void{
    this.router.navigate(["master/company"]);
  }

  toType(): void {
    this.router.navigate(["master/type"]);
  }

  toSubarea(): void {
    this.router.navigate(["master/sub-area"]);
  }

  toArea(): void {
    this.router.navigate(["master/area"]);
  }

  toCategory():void{
    this.router.navigate(["master/category"]);
  }

  toLocation(): void {
    this.router.navigate(["master/location"]);
  }

}
