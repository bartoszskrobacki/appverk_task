import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  convertToParamMap,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { customerGuard } from './customer.guard';

describe('customerGuard', () => {
  let router: Router;
  let authService: AuthService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') },
        },
        {
          provide: AuthService,
          useValue: { hasValidToken: jasmine.createSpy() },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: 'one-id' }) },
          },
        },
      ],
    });

    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    route = TestBed.get(ActivatedRoute);
  });

  it('should allow access if a valid token exists', () => {
    (authService.hasValidToken as jasmine.Spy).and.returnValue(true);

    const result = TestBed.runInInjectionContext(() =>
      customerGuard(route.snapshot, {} as RouterStateSnapshot)
    );

    expect(result).toBe(true);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should redirect to /login if no valid token exists', () => {
    (authService.hasValidToken as jasmine.Spy).and.returnValue(false);

    const result = TestBed.runInInjectionContext(() =>
      customerGuard(route.snapshot, {} as RouterStateSnapshot)
    );

    expect(result).toBe(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
