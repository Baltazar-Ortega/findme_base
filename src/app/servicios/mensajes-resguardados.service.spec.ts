import { TestBed } from '@angular/core/testing';

import { MensajesResguardadosService } from './mensajes-resguardados.service';

describe('MensajesResguardadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MensajesResguardadosService = TestBed.get(MensajesResguardadosService);
    expect(service).toBeTruthy();
  });
});
