import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextfieldValidationErrorsComponent } from './form-textfield-validation-errors.component';

describe('FormTextfieldValidationErrorsComponent', () => {
  let component: FormTextfieldValidationErrorsComponent;
  let fixture: ComponentFixture<FormTextfieldValidationErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTextfieldValidationErrorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTextfieldValidationErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
