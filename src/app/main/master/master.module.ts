import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';
import {
  MatInputModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatProgressBarModule,
  MatIconModule,
  MatTableModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatListModule,
  MatDividerModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { VariantComponent } from './variant/variant.component';
import { BrandComponent } from './brand/brand.component';
import { TypeComponent } from './type/type.component';
import { TransmissionComponent } from './transmission/transmission.component';
import { TranslateModule } from '@ngx-translate/core';
import { LocationComponent } from './location/location.component';
import { FormBrandComponent } from './brand/form-brand/form-brand.component';

const routes: Routes = [ 
                          {
                            path: 'master',
                            component: MasterComponent,
                            // canActivate: [AuthGuard],
                            children:[
                              { path: 'brand', component: BrandComponent },
                              { path: 'type', component: TypeComponent },
                              { path: 'transmission', component: TransmissionComponent },
                              { path: 'location', component: LocationComponent },
                            ]
                          },
                       ];

@NgModule({
  declarations: [MasterComponent, VariantComponent, BrandComponent, TypeComponent, TransmissionComponent, LocationComponent, FormBrandComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatProgressBarModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatListModule,
    MatDividerModule,
    FuseSidebarModule,
    TranslateModule
  ],
  exports: [RouterModule],
  entryComponents: [FormBrandComponent]
})
export class MasterModule { }
