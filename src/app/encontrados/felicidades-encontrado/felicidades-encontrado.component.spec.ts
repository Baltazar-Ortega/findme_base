import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FelicidadesEncontradoComponent } from './felicidades-encontrado.component';

describe('FelicidadesEncontradoComponent', () => {
  let component: FelicidadesEncontradoComponent;
  let fixture: ComponentFixture<FelicidadesEncontradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FelicidadesEncontradoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FelicidadesEncontradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
