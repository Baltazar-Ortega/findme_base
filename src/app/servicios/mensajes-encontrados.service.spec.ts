import { TestBed } from '@angular/core/testing';

import { MensajesEncontradosService } from './mensajes-encontrados.service';

describe('MensajesEncontradosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MensajesEncontradosService = TestBed.get(MensajesEncontradosService);
    expect(service).toBeTruthy();
  });
});
