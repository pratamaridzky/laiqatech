import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Helper } from 'app/shared/helper';
import { fuseAnimations } from '@fuse/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { inject } from '@angular/core/testing';
import { Brands } from '../model/brands';
import { BrandService } from '../brand.service';
import { Subject } from 'rxjs';
import { DialogEvent } from 'app/shared/components/dialog/common-dialog/common-dialog';

@Component({
  selector: 'app-form-brand',
  templateUrl: './form-brand.component.html',
  styleUrls: ['./form-brand.component.scss'],
  animations: fuseAnimations
})
export class FormBrandComponent implements OnInit, OnDestroy {
  form:FormGroup;
  unsubscribeAll = new Subject();
  helper = new Helper();
  isEdit:boolean = false;
  isLoading:boolean = false;
  listStatus : any[]= [
                {id:0, description:'Non Active'},
                {id:1, description:'Active'},
              ];
  

  constructor(
    public dialogRef:MatDialogRef<FormBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Brands,
    private formBuilder:FormBuilder,
    private brandService:BrandService,
  ) { 
    this.isEdit = this.data ? true : false;
  }

  ngOnInit() {
    if (this.isEdit) {
      this.form = this.formBuilder.group({
        id: new FormControl(this.data.id),
        is_active: new FormControl(this.data.is_active, Validators.required),
        description: new FormControl(this.data.description, Validators.required),
      })
    } else {
      this.form = this.formBuilder.group({
        is_active: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
      })
    }
  }

  ngOnDestroy(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onSubmit():void{
    const payload = {
      is_active: this.form.value.is_active,
      description:this.form.value.description
    };

    this.brandService.createData(payload).subscribe(response => {
      this.dialogRef.close(new DialogEvent('submit', response));
    });
  }
}
