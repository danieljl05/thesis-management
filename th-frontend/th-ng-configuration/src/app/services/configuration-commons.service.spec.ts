import { TestBed } from '@angular/core/testing';

import { ConfigurationCommonsService } from './configuration-commons.service';

describe('ConfigurationCommonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigurationCommonsService = TestBed.get(ConfigurationCommonsService);
    expect(service).toBeTruthy();
  });
});
