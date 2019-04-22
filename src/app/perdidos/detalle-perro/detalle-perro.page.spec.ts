import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePerroPage } from './detalle-perro.page';

describe('DetallePerroPage', () => {
  let component: DetallePerroPage;
  let fixture: ComponentFixture<DetallePerroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePerroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePerroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
