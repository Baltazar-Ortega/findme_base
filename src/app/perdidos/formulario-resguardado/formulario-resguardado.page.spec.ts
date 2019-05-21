import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioResguardadoPage } from './formulario-resguardado.page';

describe('FormularioResguardadoPage', () => {
  let component: FormularioResguardadoPage;
  let fixture: ComponentFixture<FormularioResguardadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioResguardadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioResguardadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
