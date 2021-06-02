import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { DialogEvent } from 'app/shared/components/dialog/common-dialog/common-dialog';
import { Helper } from 'app/shared/helper';
import { Subject } from 'rxjs';
import { AreaService } from '../../area/area.service';
import { Area } from '../../area/model/area';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../company/model/company';
import { SubArea } from '../model/sub-area';
import { SubAreaService } from '../sub-area.service';

@Component({
  selector: 'app-form-sub-area',
  templateUrl: './form-sub-area.component.html',
  styleUrls: ['./form-sub-area.component.scss'],
  animations:fuseAnimations
})
export class FormSubAreaComponent implements OnInit, OnDestroy {
  form:FormGroup;  
  unsubscribeAll = new Subject();
  helper = new Helper;
  isEdit:boolean = false;
  isLoading:boolean= false;
  listArea: Area[];
  listCompany: Company[];
  isFinishSetup = false;
  filteredArea: any[];
  filteredCompany: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:SubArea,
    public dialogRef:MatDialogRef<FormSubAreaComponent>,
    private formBuilder:FormBuilder,
    private service:SubAreaService,
    private areaService:AreaService,
    private companyService:CompanyService
  ) { 
    this.isEdit = this.data?true:false;
  }

  ngOnInit() {
    this.getCompany();
    this.initForm();
  }

  ngOnDestroy(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  
  onSubmit(): void{
    this.isLoading = true;
    /* const payload = {
      name: this.form.value.name,
      companie_id: this.form.value.companie_id,
      description : this.form.value.description,
    } */

    this.service.createData(this.form.value).subscribe(response =>{
      this.dialogRef.close(new DialogEvent('submit', response));
    });

  }

  onUpdate(): void{
    /* const payload = {
      id : this.form.value.id,
      description : this.form.value.description,
      name: this.form.value.name,
      companie_id: this.form.value.companie_id,
    } */

    this.service.updateData(this.form.value).subscribe(response => {
      this.dialogRef.close(new DialogEvent('submit', response));
    })
  }

  getCompany(): void{
    this.companyService.getCompany().subscribe(data=>{
      this.listCompany = data;
      this.filteredCompany = data.slice();
    });
  }

  getArea(): void {
    let id = this.form.value.companie_id;
    this.areaService.getArea(id).subscribe(data=>{
        this.listArea = data;
        this.filteredArea = data.slice();
    });
  }

  initForm():void{
    if (this.isEdit) {
      this.form = this.formBuilder.group({
        id:new FormControl(this.data.id, Validators.required),
        companie_id:new FormControl(this.data.area.companie.id, Validators.required),
        area_id:new FormControl(this.data.area.id, Validators.required),
        description:new FormControl(this.data.description, Validators.required),
        address:new FormControl(this.data.address, Validators.required),
        phone1:new FormControl(this.data.phone1, [Validators.required, Validators.minLength(7), Validators.maxLength(13)]),
        phone2:new FormControl(this.data.phone2, [Validators.minLength(7), Validators.maxLength(13)]),
        email:new FormControl(this.data.email, [Validators.required, Validators.email]),
        deleted_at:new FormControl({ value: this.data.deleted_at, disabled: true }),
        created_at:new FormControl({ value: this.data.created_at, disabled: true }),
      });
      this.getArea();
    } else {
      this.form = this.formBuilder.group({
        companie_id:new FormControl("", Validators.required),
        area_id:new FormControl("", Validators.required),
        description:new FormControl("", Validators.required),
        address:new FormControl("", Validators.required),
        phone1:new FormControl("", [Validators.required, Validators.maxLength(7), Validators.maxLength(13)]),
        phone2:new FormControl("", [Validators.maxLength(7), Validators.maxLength(13)]),
        email:new FormControl("", [Validators.required, Validators.email]),
      })
    }
  }

}
