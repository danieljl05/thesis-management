import { TestBed } from '@angular/core/testing';

import { ThNgCommonsService } from './th-ng-commons.service';

describe('ThNgCommonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThNgCommonsService = TestBed.get(ThNgCommonsService);
    expect(service).toBeTruthy();
  });
});
