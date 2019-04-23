import { TestBed } from '@angular/core/testing';

import { PerrosEncontradosService } from './perros-encontrados.service';

describe('PerrosEncontradosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerrosEncontradosService = TestBed.get(PerrosEncontradosService);
    expect(service).toBeTruthy();
  });
});
