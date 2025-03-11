import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextfieldComponent } from './form-textfield.component';

describe('FormTextfieldComponent', () => {
  let component: FormTextfieldComponent<HTMLInputElement>;
  let fixture: ComponentFixture<FormTextfieldComponent<HTMLInputElement>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTextfieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormTextfieldComponent<HTMLInputElement>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
