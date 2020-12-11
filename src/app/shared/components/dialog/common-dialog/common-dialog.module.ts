import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonDialogComponent } from 'app/shared/components/dialog/common-dialog/common-dialog.component';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { CommonDialogService } from 'app/shared/components/dialog/common-dialog/common-dialog.service';

@NgModule({
    declarations: [CommonDialogComponent],
    imports: [CommonModule, MatIconModule, MatButtonModule],
    exports: [CommonDialogComponent],
    providers: [CommonDialogService],
    entryComponents: [CommonDialogComponent]
})
export class CommonDialogModule {}
