import { Component, Inject, inject } from '@angular/core';
import { FormTextfieldComponent } from '../../shared/form-textfield/form-textfield.component';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerService } from '../../core/customer.service';
import { Router } from '@angular/router';
import { emailValidator } from '../../shared/validators/email-validator';
import { emailErrors } from '../../shared/validators/email-validator';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormTextfieldComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  customerService = inject(CustomerService);
  router = inject(Router);

  emailErrors = emailErrors;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, emailValidator()]),
    password: new FormControl('', [Validators.required]),
  });

  submitLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.customerService
        .onLogin(email, password)
        .subscribe((shouldNavigate) => {
          if (shouldNavigate) {
            this.router.navigateByUrl('/');
          }
        });
    }
  }
}
