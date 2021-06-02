import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Pagination, PaginationPage, PagingAttributes } from "app/shared/pagination";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { CompanyService } from "../company.service";
import { Company } from "./company";

export class CompanyDataSource implements DataSource<Company>{
  public pagination = new BehaviorSubject<PagingAttributes>(
    new PagingAttributes()
  );

  public subject = new BehaviorSubject<Company[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private service: CompanyService){}

  connect(collectionViewer:CollectionViewer):Observable<Company[]>{
    return this.subject.asObservable();
  }

  disconnect(collectionViewer:CollectionViewer):void{
    this.subject.complete();
    this.loadingSubject.complete();
  }

  loadData(page:PaginationPage):void{
    this.loadingSubject.next(true);
    this.service
      .loadData(page)
      .pipe(
        catchError(()=>of([])),
        finalize(()=>this.loadingSubject.next(false))
      )
      .subscribe((data:Pagination<Company>)=>{
        this.subject.next(data.data);
        this.pagination.next({
          iTotalDisplayRecords:data.to,
          iTotalRecords:data.total
        })
      })
  }
}
