import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authentificateGuard } from './authentificate.guard';

describe('authentificateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authentificateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
