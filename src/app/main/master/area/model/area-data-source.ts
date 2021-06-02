import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { Pagination, PaginationPage, PagingAttributes } from "app/shared/pagination";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { AreaService } from "../area.service";
import { Area } from "./area";

export class AreaDataSource implements DataSource<Area>{
  public pagination = new BehaviorSubject<PagingAttributes>(
    new PagingAttributes()
  );

  public subject = new BehaviorSubject<Area[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private service:AreaService){}

  connect(collectionViewer:CollectionViewer):Observable<Area[]>{
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
      .subscribe((data:Pagination<Area>)=>{
        this.subject.next(data.data);
        this.pagination.next({
          iTotalDisplayRecords:data.to,
          iTotalRecords:data.total
        })
      })
  }
}
