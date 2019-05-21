import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FelicidadesResguardadoComponent } from './felicidades-resguardado.component';

describe('FelicidadesResguardadoComponent', () => {
  let component: FelicidadesResguardadoComponent;
  let fixture: ComponentFixture<FelicidadesResguardadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FelicidadesResguardadoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FelicidadesResguardadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
