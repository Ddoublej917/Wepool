import { TestBed } from '@angular/core/testing';

import { ModGuard } from './mod_auth.guard';

describe('AuthenticationGuard', () => {
  let guard: ModGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ModGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
