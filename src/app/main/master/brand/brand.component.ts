import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator, MatDialog, MatSnackBar} from '@angular/material';
import { PaginationPage } from 'app/shared/pagination';
import { BrandsDataSource } from './model/brands-data-source';
import { Helper } from 'app/shared/helper';
import { SelectionModel } from '@angular/cdk/collections';
import { Brands } from './model/brands';
import { BrandService } from './brand.service';
import { CommonDialogService } from 'app/shared/components/dialog/common-dialog/common-dialog.service';
import { tap } from 'rxjs/operators';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { DialogEvent, CommonDialog } from 'app/shared/components/dialog/common-dialog/common-dialog';
import { ApiResponse } from 'app/shared/api-response';
import { FormBrandComponent } from './form-brand/form-brand.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
  animations: fuseAnimations
})
export class BrandComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  toggleDelete = false;
  deleteToggle = new BehaviorSubject<boolean>(this.toggleDelete);
  page = new PaginationPage;
  dataSource:BrandsDataSource;
  searchTextSubject = new Subject<any>();
  displayedColumns = ["description", "is_active", "action"];
  helper = new Helper();
  selection = new SelectionModel<Brands>(true, []);

  private _unsubscribeAll: Subject<any>;

  constructor(
    private splaceScreen : FuseSplashScreenService,
    private brandsService:BrandService,
    public dialog:MatDialog,
    private commonDialogService: CommonDialogService,
    public snackBar: MatSnackBar,

  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit():void {
    this.dataSource = new BrandsDataSource(this.brandsService);
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
    this.page.page = this.paginator.pageIndex;
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

  openDialog(ref: Brands = null):void{
    const dialogRef = this.dialog.open(FormBrandComponent,{
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
    const dialog = new CommonDialog({
        title: response.title,
        message: response.message
    });
    this.commonDialogService.open(dialog).subscribe(() => this.loadData());
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
    console.log(numSelected, numRows);
    
    return numSelected === numRows;
  }
}
