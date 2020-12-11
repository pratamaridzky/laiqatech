import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CommonDialogComponent } from 'app/shared/components/dialog/common-dialog/common-dialog.component';
import { CommonDialog, DialogEvent } from './common-dialog';

@Injectable({
    providedIn: 'root'
})
export class CommonDialogService {
    action: BehaviorSubject<DialogEvent<any>>;

    constructor(private dialog: MatDialog) {}

    public open(
        properties: CommonDialog,
        event?: DialogEvent<any>
    ): Observable<DialogEvent<any>> {
        let dialogEvent = new DialogEvent();
        if (event) {
            dialogEvent = event;
        }
        this.action = new BehaviorSubject<DialogEvent<any>>(dialogEvent);
        this.dialog.open(CommonDialogComponent, {
            minWidth: '20%',
            data: properties
        });
        return this.action.asObservable();
    }
}
