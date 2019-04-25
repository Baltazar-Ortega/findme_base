import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapModalAnuncioComponent } from './map-modal-anuncio.component';

describe('MapModalAnuncioComponent', () => {
  let component: MapModalAnuncioComponent;
  let fixture: ComponentFixture<MapModalAnuncioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapModalAnuncioComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapModalAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
