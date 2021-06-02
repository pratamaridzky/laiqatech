import { Injectable } from '@angular/core';
import { AppSettings } from 'app/app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StorageService } from 'app/shared/storage.service';
import { PaginationPage, Pagination } from 'app/shared/pagination';
import { Observable, of } from 'rxjs';
import { Brands } from './model/brands';
import { ApiResponse } from 'app/shared/api-response';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BrandService {

  private appSettings = new AppSettings();
  name:string;
  apiEndpoint: string;

  constructor(
    private http:HttpClient, 
    private storage: StorageService
  ) { 
    this.name = storage.get('name');
    this.apiEndpoint = this.appSettings.getApiEndpoint('brand');
  }

  loadData(page:PaginationPage):Observable<Pagination<Brands>>{
    let httpParams = new HttpParams();

    Object.keys(page).forEach(item=>{
      httpParams = httpParams.append(item, page[item]);
    });

    return this.http.get<Pagination<Brands>>(this.apiEndpoint, {params:httpParams});
  }

  createData(brand:Brands):Observable<ApiResponse>{
    return this.http
        .post<ApiResponse>(this.apiEndpoint,{
          data:brand
        })
        .pipe(
          map(response => response),
          catchError(error=>of(error.error))
        );
  }

  updateData(brand: Brands): Observable<ApiResponse> {
    return this.http
        .put<ApiResponse>(this.apiEndpoint, {
            data: brand
        })
        .pipe(
            map(response => response),
            catchError(error => of(error.error))
        );
  }

  deleteData(params: any): Observable<ApiResponse> {
    return this.http
        .delete<ApiResponse>(this.apiEndpoint, params)
        .pipe(
            map(result => result),
            catchError(errors => of(errors.error))
        );
  }


}
