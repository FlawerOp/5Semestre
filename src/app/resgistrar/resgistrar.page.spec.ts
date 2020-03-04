import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgistrarPage } from './resgistrar.page';

describe('ResgistrarPage', () => {
  let component: ResgistrarPage;
  let fixture: ComponentFixture<ResgistrarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResgistrarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResgistrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
