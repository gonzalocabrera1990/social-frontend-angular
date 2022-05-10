import { TestBed } from '@angular/core/testing';

import { AuthGuardTrueService } from './auth-guard-true.service';

describe('AuthGuardTrueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardTrueService = TestBed.get(AuthGuardTrueService);
    expect(service).toBeTruthy();
  });
});
