import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';

export type LoginResponse = { login: string; password: string };

@Injectable({ providedIn: 'root' })
export class CustomerService {
  httpClient = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  onLogin(email: string, pass: string) {
    //should be POST without mocked api
    return this.httpClient.get<LoginResponse>('/assets/credentials.json').pipe(
      map(({ login, password }) => {
        const checkCredentials = login == email && password == pass;

        if (checkCredentials) {
          const token = crypto.randomUUID();
          this.authService.saveToken(token);
          return true;
        }
        return false;
      })
    );
  }

  getLoginData() {
    return this.httpClient.get<LoginResponse>('/assets/credentials.json');
  }
}
