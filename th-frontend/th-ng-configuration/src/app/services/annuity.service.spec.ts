import { TestBed } from '@angular/core/testing';

import { AnnuityService } from './annuity.service';

describe('AnnuityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnuityService = TestBed.get(AnnuityService);
    expect(service).toBeTruthy();
  });
});
