import { TestBed } from '@angular/core/testing';

import { StaticImageService } from './static-image.service';

describe('StaticImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaticImageService = TestBed.get(StaticImageService);
    expect(service).toBeTruthy();
  });
});
