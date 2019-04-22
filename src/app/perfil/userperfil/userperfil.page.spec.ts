import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserperfilPage } from './userperfil.page';

describe('UserperfilPage', () => {
  let component: UserperfilPage;
  let fixture: ComponentFixture<UserperfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserperfilPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
