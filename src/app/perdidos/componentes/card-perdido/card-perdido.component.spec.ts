import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPerdidoComponent } from './card-perdido.component';

describe('CardPerdidoComponent', () => {
  let component: CardPerdidoComponent;
  let fixture: ComponentFixture<CardPerdidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPerdidoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPerdidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
