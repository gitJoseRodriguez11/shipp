import { TestBed } from '@angular/core/testing';

import { FrecuenteService } from './frecuente.service';

describe('FrecuenteService', () => {
  let service: FrecuenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrecuenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
