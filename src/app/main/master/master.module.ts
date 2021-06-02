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
  MatDividerModule,
  MatDatepickerModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { BrandComponent } from './brand/brand.component';
import { TypeComponent } from './type/type.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBrandComponent } from './brand/form-brand/form-brand.component';
import { CompanyComponent } from './company/company.component';
import { FormCompanyComponent } from './company/form-company/form-company.component';
import { CategoryComponent } from './category/category.component';
import { FormCategoryComponent } from './category/form-category/form-category.component';
import { CurrencyComponent } from './currency/currency.component';
import { FormCurrencyComponent } from './currency/form-currency/form-currency.component';
import { SubAreaComponent } from './sub-area/sub-area.component';
import { FormSubAreaComponent } from './sub-area/form-sub-area/form-sub-area.component';
import { FormAreaComponent } from './area/form-area/form-area.component';
import { AreaComponent } from './area/area.component';
import { MatSelectFilterModule } from 'mat-select-filter';

const routes: Routes = [ 
                          {
                            path: 'master',
                            component: MasterComponent,
                            // canActivate: [AuthGuard],
                            children:[
                              { path: 'company', component: CompanyComponent},
                              { path: 'area', component: AreaComponent},
                              { path: 'sub-area', component: SubAreaComponent},
                              { path: 'category', component: CategoryComponent},
                              { path: 'type', component: TypeComponent },
                              { path: 'brand', component: BrandComponent },
                              { path: 'currency', component: CurrencyComponent },
                            ]
                          },
                       ];

@NgModule({
  declarations: [MasterComponent, BrandComponent, TypeComponent, FormBrandComponent, CompanyComponent, FormCompanyComponent, CategoryComponent, FormCategoryComponent, CurrencyComponent, FormCurrencyComponent, SubAreaComponent, FormSubAreaComponent, AreaComponent, FormAreaComponent ],
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
    TranslateModule,
    MatDatepickerModule,
    MatSelectFilterModule
  ],
  exports: [RouterModule],
  entryComponents: [
    FormBrandComponent, 
    FormCompanyComponent, 
    FormCurrencyComponent, 
    FormCategoryComponent, 
    FormSubAreaComponent,
    FormAreaComponent
  ]
})
export class MasterModule { }
