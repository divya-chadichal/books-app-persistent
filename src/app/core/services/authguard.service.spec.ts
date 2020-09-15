import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './authguard.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('canActivate return true', () => {
    const result = service.canActivate();
    expect(result);
  });

});

