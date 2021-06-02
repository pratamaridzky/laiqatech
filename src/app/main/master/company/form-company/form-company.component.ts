import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { DialogEvent } from 'app/shared/components/dialog/common-dialog/common-dialog';
import { Helper } from 'app/shared/helper';
import { Subject } from 'rxjs';
import { CompanyService } from '../company.service';
import { Company } from '../model/company';

@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.scss'],
  animations:fuseAnimations
})

export class FormCompanyComponent implements OnInit, OnDestroy{
  form:FormGroup;
  unsubscribeAll = new Subject();
  helper = new Helper;
  isEdit:boolean = false;
  isLoading:boolean= false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:Company,
    public dialogRef:MatDialogRef<FormCompanyComponent>,
    private formBuilder:FormBuilder,
    private service:CompanyService,
  ) { 
    this.isEdit = this.data?true:false;
  }

  ngOnInit():void {
    if (this.isEdit) {
      this.form = this.formBuilder.group({
        id:new FormControl(this.data.id, Validators.required),
        code:new FormControl(this.data.code, Validators.required),
        description:new FormControl(this.data.description, Validators.required),
        deleted_at:new FormControl(this.data.deleted_at),
        created_at:new FormControl(this.data.created_at),
      });
    } else {
      this.form = this.formBuilder.group({
        code:new FormControl("", Validators.required),
        description:new FormControl("", Validators.required),
        deleted_at:new FormControl(""),
        created_at:new FormControl(""),
      })
    }
  }

  ngOnDestroy(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  
  onSubmit(): void{
    this.isLoading = true;
    const payload = {
      description : this.form.value.description,
      code : this.form.value.code
    }

    this.service.createData(payload).subscribe(response =>{
      this.dialogRef.close(new DialogEvent('submit', response));
    });

  }

  onUpdate(): void{
    const payload = {
      id : this.form.value.id,
      description : this.form.value.description,
      code : this.form.value.code
    }

    this.service.updateData(payload).subscribe(response => {
      this.dialogRef.close(new DialogEvent('submit', response));
    })
  }

}
