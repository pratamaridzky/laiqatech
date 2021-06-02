import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { Pagination, PaginationPage, PagingAttributes } from "app/shared/pagination";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { SubAreaService } from "../sub-area.service";
import { SubArea } from "./sub-area";

export class SubAreaDataSource implements DataSource<SubArea>{
  public pagination = new BehaviorSubject<PagingAttributes>(
    new PagingAttributes()
  )

  public subject = new BehaviorSubject<SubArea[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private service: SubAreaService){}

  connect(collectionViewer:CollectionViewer):Observable<SubArea[]>{
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
      .subscribe((data:Pagination<SubArea>)=>{
        this.subject.next(data.data);
        this.pagination.next({
          iTotalDisplayRecords:data.to,
          iTotalRecords:data.total
        })
      })
  }
}
