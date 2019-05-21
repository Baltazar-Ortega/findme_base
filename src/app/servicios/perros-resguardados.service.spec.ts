import { TestBed } from '@angular/core/testing';

import { PerrosResguardadosService } from './perros-resguardados.service';

describe('PerrosResguardadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerrosResguardadosService = TestBed.get(PerrosResguardadosService);
    expect(service).toBeTruthy();
  });
});
