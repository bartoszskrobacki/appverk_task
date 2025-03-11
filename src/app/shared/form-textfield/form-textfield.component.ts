import { Component, forwardRef, Input, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { ControlValueAccessorDirective } from './control-value-accessor/control-value-accessor.directive';
import { CommonModule } from '@angular/common';
import { FormTextfieldValidationErrorsComponent } from './form-textfield-validation-errors/form-textfield-validation-errors.component';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormTextfieldComponent),
  multi: true,
};

type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

@Component({
  selector: 'app-form-textfield',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormTextfieldValidationErrorsComponent,
  ],
  templateUrl: './form-textfield.component.html',
  styleUrl: './form-textfield.component.scss',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class FormTextfieldComponent<
  T
> extends ControlValueAccessorDirective<T> {
  @Input() inputId: string = '';
  @Input() label: string = '';
  @Input() type: InputType = 'text';
  @Input() placeholder: string = '';
  @Input() customErrorMessages: Record<string, string> = {};
}
