import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

type LoginCredentails = { password: string; login: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  platformId = inject(PLATFORM_ID);

  get accessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  saveToken(token: string) {
    this.accessToken = token;
  }

  hasValidToken() {
    if (isPlatformBrowser(this.platformId)) {
      return this.accessToken !== null;
    }
    return false;
  }
}
