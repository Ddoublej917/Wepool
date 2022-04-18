import { TestBed } from '@angular/core/testing';

import { ModAuthguardService } from './mod_authguard.service';

describe('AuthguardServiceService', () => {
  let service: ModAuthguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModAuthguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
