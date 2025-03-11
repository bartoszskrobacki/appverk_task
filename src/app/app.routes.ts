import { Routes } from '@angular/router';
import { LoginPageComponent } from './customer/login-page/login-page.component';
import { DashboardComponent } from './customer/dashboard/dashboard.component';
import { customerGuard } from './core/customer.guard';
import { loginGuard } from './core/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Login',
    canActivate: [loginGuard],
  },
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [customerGuard],
  },
];
