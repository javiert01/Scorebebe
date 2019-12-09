import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPasswordDialogComponent } from './nuevo-password-dialog.component';

describe('NuevoPasswordDialogComponent', () => {
  let component: NuevoPasswordDialogComponent;
  let fixture: ComponentFixture<NuevoPasswordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoPasswordDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
