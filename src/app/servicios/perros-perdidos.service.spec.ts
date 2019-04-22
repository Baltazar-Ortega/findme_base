import { TestBed } from '@angular/core/testing';

import { PerrosPerdidosService } from './perros-perdidos.service';

describe('PerrosPerdidosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerrosPerdidosService = TestBed.get(PerrosPerdidosService);
    expect(service).toBeTruthy();
  });
});
