import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPasswordDialogComponent } from './cambio-password-dialog.component';

describe('CambioPasswordDialogComponent', () => {
  let component: CambioPasswordDialogComponent;
  let fixture: ComponentFixture<CambioPasswordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioPasswordDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
