import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubAreaComponent } from './form-sub-area.component';

describe('FormSubAreaComponent', () => {
  let component: FormSubAreaComponent;
  let fixture: ComponentFixture<FormSubAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSubAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
