import { Component, OnInit } from '@angular/core';
import { CustomerService, LoginResponse } from '../../core/customer.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  loginData$: Observable<LoginResponse>;
  constructor(private customerService: CustomerService) {}
  ngOnInit(): void {
    this.loginData$ = this.customerService.getLoginData();
  }
}
