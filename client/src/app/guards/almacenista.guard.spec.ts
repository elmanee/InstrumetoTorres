import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { almacenistaGuard } from './almacenista.guard';

describe('almacenistaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => almacenistaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
