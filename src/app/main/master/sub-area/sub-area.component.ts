import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { ApiResponse } from 'app/shared/api-response';
import { CommonDialog, DialogEvent } from 'app/shared/components/dialog/common-dialog/common-dialog';
import { CommonDialogService } from 'app/shared/components/dialog/common-dialog/common-dialog.service';
import { Helper } from 'app/shared/helper';
import { PaginationPage } from 'app/shared/pagination';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormSubAreaComponent } from './form-sub-area/form-sub-area.component';
import { SubArea } from './model/sub-area';
import { SubAreaDataSource } from './model/sub-area-data-source';
import { SubAreaService } from './sub-area.service';

@Component({
  selector: 'app-sub-area',
  templateUrl: './sub-area.component.html',
  styleUrls: ['./sub-area.component.scss'],
  animations:fuseAnimations
})
export class SubAreaComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator, {static:false})paginator:MatPaginator

  toggleDelete = false;
  deleteToggle = new BehaviorSubject<boolean>(this.toggleDelete);
  page = new PaginationPage;
  dataSource:SubAreaDataSource;
  searchTextSubject = new Subject<any>();
  displayedColumns = ["area", "subarea", "phone1", "email", "create_at", "delete_at", "action"];
  helper = new Helper();
  selection = new SelectionModel<SubArea>(true, []);
  blockComponent = new BehaviorSubject<boolean>(false);
  
  private _unsubscribeAll: Subject<any>;

  constructor(
    private service :SubAreaService,
    public dialog:MatDialog,
    private commonDialogService:CommonDialogService,
    public snackBar:MatSnackBar
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit():void {
    this.dataSource = new SubAreaDataSource(this.service);
    this.dataSource.loadData(this.page);
    this.deleteToggle.subscribe(val=>{
      if (val) {
        this.displayedColumns = ["select", ...this.displayedColumns];
      } else {
        const idx = this.displayedColumns.indexOf("select");
        if (idx!==-1) {
          this.displayedColumns.splice(idx,1);
        }
      }
    })
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(tap(() => this.loadData())).subscribe();
    this.searchTextSubject.subscribe(val => {
        setTimeout(() => console.log(val)
        , 1000);
    });
  }

  loadData():void{
    this.page.page = this.paginator.pageIndex+1;
    this.page.limit = this.paginator.pageSize;
    this.dataSource.loadData(this.page);
    this.selection.clear();
  }

  ngOnDestroy(): void
  {
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  search(query:string):void{
    this.page.search= query;
    this.dataSource.loadData(this.page);
  }

  masterToggle():void{
    this.isAllSelected()
    ? this.selection.clear() : this.dataSource.subject.value.forEach(
      row => this.selection.select(row)
    );
  }

  isAllSelected():boolean {
    const numSelected = this.selection.selected.length;
    const numRows = Number(this.dataSource.pagination.value.iTotalDisplayRecords);
    
    return numSelected === numRows;
  }

  openDialog(ref: SubArea = null):void{
    const dialogRef = this.dialog.open(FormSubAreaComponent,{
      data: ref,
      panelClass: 'elearning-dialog'
    })

    dialogRef
      .afterClosed()
        .subscribe((result:DialogEvent<ApiResponse>) => {
          if (result instanceof DialogEvent) {
            if (result.isSubmit()) {
              this.responseDialog(result.getData());
            }
          } else {
            this.loadData();
          }
          
        });
  }
  
  responseDialog(response: ApiResponse): void {
    this.blockComponent.next(false);
    const dialog = new CommonDialog({
        title: response.title,
        message: response.message
    });
    this.commonDialogService.open(dialog).subscribe(() => this.loadData());
  }

  deleteAction(type:string): void {
    const dialog = new CommonDialog({
      title: "Delete Sub Area",
      message: "Are you sure want to delete this item ?",
      isCancelable: true,
      textButtonCancel: "CANCEL"
    });

    this.commonDialogService.open(dialog).subscribe(val => {
      if (val.isSubmit()) {
        const payload = this.helper.buildDeletePayload(
          this.selection.selected
        );
        this.service
          .deleteData({
            type:type,
            data:payload
          })
          .subscribe(response =>
              this.responseDialog(new ApiResponse(response))
          );
      }
      if (val.isCancel() || val.isDestroy()) {
        this.snackBar.open("Request Cancelled", "OK", {
          duration: 90000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-info"]
        });
      }
    })

  }

  restore(data:SubArea):void{
    const dialog = new CommonDialog({
      title: "Restore",
      message: "Are you sure want to restore this item ?",
      isCancelable: true,
      textButtonCancel: "CANCEL"
    });

    this.commonDialogService.open(dialog).subscribe(val => {
      if (val.isSubmit()) {

        this.service
          .restoreData(data.id)
          .subscribe(response =>
              this.responseDialog(new ApiResponse(response))
          );
      }
      if (val.isCancel() || val.isDestroy()) {
        this.snackBar.open("Request Cancelled", "OK", {
          duration: 90000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-info"]
        });
      }
    })
  }

}
