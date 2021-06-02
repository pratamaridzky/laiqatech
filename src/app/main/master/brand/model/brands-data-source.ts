import { DataSource } from '@angular/cdk/table';
import { Brands } from './brands';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PagingAttributes,PaginationPage, Pagination } from 'app/shared/pagination';
import { BrandService } from '../brand.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';

export class BrandsDataSource implements DataSource<Brands>{
  public pagination = new BehaviorSubject<PagingAttributes>(
    new PagingAttributes()
  );

  public subject = new BehaviorSubject<Brands[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private brandService: BrandService){}

  connect(collectionViewer: CollectionViewer):Observable<Brands[]>{
    return this.subject.asObservable();
  }

  disconnect(collectionViewer:CollectionViewer):void{
    this.subject.complete();
    this.loadingSubject.complete();
  }

  loadData(page:PaginationPage):void{
    this.loadingSubject.next(true);
    this.brandService
        .loadData(page)
        .pipe(
          catchError(()=>of([])),
          finalize(()=>this.loadingSubject.next(false))
        )
        .subscribe((data:Pagination<Brands>)=>{
          this.subject.next(data.data);
          this.pagination.next({
            iTotalDisplayRecords:data.to,
            iTotalRecords:data.total
          });
        });   
  }
}
