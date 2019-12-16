import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCodigosDialogComponent } from './error-codigos-dialog.component';

describe('ErrorCodigosDialogComponent', () => {
  let component: ErrorCodigosDialogComponent;
  let fixture: ComponentFixture<ErrorCodigosDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorCodigosDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorCodigosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
