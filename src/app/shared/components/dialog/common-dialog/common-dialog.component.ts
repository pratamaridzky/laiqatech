import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CommonDialogService } from 'app/shared/components/dialog/common-dialog/common-dialog.service';
import {
    CommonDialog,
    DialogEvent
} from 'app/shared/components/dialog/common-dialog/common-dialog';

@Component({
    selector: 'app-common-dialog',
    templateUrl: './common-dialog.component.html',
    styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent implements OnInit, OnDestroy {
    title: string;
    message: string;
    textButton = 'OK';
    textButtonCancel: string;
    isCancelable = false;

    constructor(
        private dialogService: CommonDialogService,
        private dialogRef: MatDialogRef<CommonDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: CommonDialog
    ) {
        this.title = data.title;
        this.message = data.message;
        this.textButton = data.textButton;
        this.isCancelable = data.isCancelable;
        this.textButtonCancel = data.textButtonCancel;
    }

    ngOnInit(): void {}

    onSubmit(): void {
        this.dialogRef.close();
        this.dialogService.action.next(new DialogEvent('submit'));
        this.dialogService.action.complete();
    }

    onCancel(): void {
        this.dialogRef.close();
        this.dialogService.action.next(new DialogEvent('cancel'));
        this.dialogService.action.complete();
    }

    ngOnDestroy(): void {
        this.dialogService.action.next(new DialogEvent('destroy'));
        this.dialogService.action.complete();
    }
}
