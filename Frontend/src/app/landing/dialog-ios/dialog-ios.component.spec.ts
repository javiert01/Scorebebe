import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogIosComponent } from './dialog-ios.component';

describe('DialogIosComponent', () => {
  let component: DialogIosComponent;
  let fixture: ComponentFixture<DialogIosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogIosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogIosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
