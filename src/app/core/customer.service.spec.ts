import { TestBed } from '@angular/core/testing';
import { CustomerService } from './customer.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

class MockAuthService {
  saveToken(token: string): void {}
}

class MockRouter {
  navigate(commands: any[], extras?: any): void {}
}

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;
  let authService: MockAuthService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CustomerService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    });

    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if login credentials are correct', () => {
    const mockResponse = { login: 'test@example.com', password: 'password123' };
    const email = 'test@example.com';
    const password = 'password123';

    service.onLogin(email, password).subscribe((result) => {
      expect(result).toBe(true);
    });

    const req = httpMock.expectOne('/assets/credentials.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return false if login credentials are incorrect', () => {
    const mockResponse = { login: 'test@example.com', password: 'password123' };
    const email = 'wrong@example.com';
    const password = 'wrongPassword';

    service.onLogin(email, password).subscribe((result) => {
      expect(result).toBe(false);
    });

    const req = httpMock.expectOne('/assets/credentials.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call saveToken when credentials are correct', () => {
    const mockResponse = { login: 'test@example.com', password: 'password123' };
    const email = 'test@example.com';
    const password = 'password123';

    spyOn(authService, 'saveToken');

    service.onLogin(email, password).subscribe((result) => {
      expect(result).toBe(true);
      expect(authService.saveToken).toHaveBeenCalled();
    });

    const req = httpMock.expectOne('/assets/credentials.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return login data correctly from getLoginData', () => {
    const mockResponse = { login: 'test@example.com', password: 'password123' };

    service.getLoginData().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/assets/credentials.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
