import { TestBed } from '@angular/core/testing';

import { LoEncontreService } from './lo-encontre.service';

describe('LoEncontreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoEncontreService = TestBed.get(LoEncontreService);
    expect(service).toBeTruthy();
  });
});
