import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { DialogEvent } from 'app/shared/components/dialog/common-dialog/common-dialog';
import { Helper } from 'app/shared/helper';
import { BehaviorSubject, Subject } from 'rxjs';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../company/model/company';
import { AreaService } from '../area.service';
import { Area } from '../model/area';

@Component({
  selector: 'app-form-area',
  templateUrl: './form-area.component.html',
  styleUrls: ['./form-area.component.scss'],
  animations:fuseAnimations
})

export class FormAreaComponent implements OnInit, OnDestroy {
  form:FormGroup;  
  unsubscribeAll = new Subject();
  helper = new Helper;
  isEdit:boolean = false;
  isLoading:boolean= false;
  listCompany: Company[];
  isFinishSetup = false;
  filteredCompany: any[];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:Area,
    public dialogRef:MatDialogRef<FormAreaComponent>,
    private formBuilder:FormBuilder,
    private service:AreaService,
    private companyService:CompanyService
  ) { 
    this.isEdit = this.data?true:false;
  }

  ngOnInit():void {
    this.initFilter();

    if (this.isEdit) {
      this.form = this.formBuilder.group({
        id:new FormControl(this.data.id, Validators.required),
        companie_id:new FormControl(this.data.companie.id, Validators.required),
        description:new FormControl(this.data.description, Validators.required),
        name:new FormControl(this.data.name, Validators.required),
        deleted_at:new FormControl(this.data.deleted_at),
        created_at:new FormControl(this.data.created_at),
      });
    } else {
      this.form = this.formBuilder.group({
        companie_id:new FormControl("", Validators.required),
        name:new FormControl("", Validators.required),
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
      name: this.form.value.name,
      companie_id: this.form.value.companie_id,
      description : this.form.value.description,
    }

    this.service.createData(payload).subscribe(response =>{
      this.dialogRef.close(new DialogEvent('submit', response));
    });

  }

  onUpdate(): void{
    const payload = {
      id : this.form.value.id,
      description : this.form.value.description,
      name: this.form.value.name,
      companie_id: this.form.value.companie_id,
    }

    this.service.updateData(payload).subscribe(response => {
      this.dialogRef.close(new DialogEvent('submit', response));
    })
  }

  initFilter(): void {
    this.companyService.getCompany().subscribe(data=>{
        this.listCompany = data;
        this.filteredCompany = data.slice();
    });
  }

}
