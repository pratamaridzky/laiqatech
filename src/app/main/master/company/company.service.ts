import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'app/app.settings';
import { ApiResponse } from 'app/shared/api-response';
import { Pagination, PaginationPage } from 'app/shared/pagination';
import { StorageService } from 'app/shared/storage.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Company } from './model/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private appSetting = new AppSettings();
  name:string;
  apiEndpoint:string;

  constructor(
    private http:HttpClient,
    private storage:StorageService
  ) { 
    this.apiEndpoint = this.appSetting.getApiEndpoint('company');
  }

  loadData(page:PaginationPage):Observable<Pagination<Company>>{
    let httpParams = new HttpParams();

    Object.keys(page).forEach(item=>{
      httpParams= httpParams.append(item, page[item]);
    });

    return this.http.get<Pagination<Company>>(this.apiEndpoint,{params:httpParams});
  }

  deleteData(data: any): Observable<ApiResponse> {
    return this.http
        .post<ApiResponse>(this.apiEndpoint+'/delete', data)
        .pipe(
            map((result) => result),
            catchError((errors) => of(errors.error))
        );
  }
  
  createData(data: any): Observable<ApiResponse> {
    return this.http
        .post<ApiResponse>(this.apiEndpoint, data)
        .pipe(
            map((response) => response),
            catchError((error) => of(error.error))
        );
  }

  updateData(data: any): Observable<ApiResponse> {
    return this.http
        .put<ApiResponse>(this.apiEndpoint+'/'+data.id, data)
        .pipe(
            map((response) => response),
            catchError((error) => of(error.error))
        );
  }

  restoreData(id: number): Observable<ApiResponse> {
    return this.http
        .put<ApiResponse>(this.apiEndpoint+'/restore/'+id,{})
        .pipe(
            map((response) => response),
            catchError((error) => of(error.error))
        );
  }

  getCompany(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiEndpoint+'/getData');
  }
  
}
