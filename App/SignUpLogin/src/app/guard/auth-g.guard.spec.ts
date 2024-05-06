import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGGuard } from './authGGuard';

describe('authGGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
