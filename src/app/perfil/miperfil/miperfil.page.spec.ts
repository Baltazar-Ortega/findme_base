import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiperfilPage } from './miperfil.page';

describe('MiperfilPage', () => {
  let component: MiperfilPage;
  let fixture: ComponentFixture<MiperfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiperfilPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
