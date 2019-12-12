import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCie10Component } from './dialog-cie10.component';

describe('DialogCie10Component', () => {
  let component: DialogCie10Component;
  let fixture: ComponentFixture<DialogCie10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCie10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCie10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
