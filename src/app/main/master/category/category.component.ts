import { SelectionModel } from '@angular/cdk/collections';
import { ViewCompiler } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar } from '@angular/material';
import { CommonDialogService } from 'app/shared/components/dialog/common-dialog/common-dialog.service';
import { Helper } from 'app/shared/helper';
import { PaginationPage } from 'app/shared/pagination';
import { BehaviorSubject, Subject } from 'rxjs';
import { CategoryService } from './category.service';
import { Category } from './model/category';
import { CategoryDataSource } from './model/category-data-source';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static:false})paginator:MatPaginator

  toggleDelete = false;
  deleteToogle = new  BehaviorSubject<boolean>(this.toggleDelete);
  page = new PaginationPage;
  dataSource:CategoryDataSource;
  searchTextSubject = new Subject<any>();
  helper = new Helper();
  selection = new SelectionModel<Category>(true,[]);
  blockComponent = new BehaviorSubject<boolean>(false);
  displayedColumns = ["code", "description", "create_at", "delete_at", "action"];

  private _unsubscribeAll:Subject<any>;
  constructor(
    private service :CategoryService,
    private commonDialogservice :CommonDialogService,
    public dialog :MatDialog,
    public snackBar :MatSnackBar
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

}
