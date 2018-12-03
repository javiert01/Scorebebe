import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarUsuariosComponent } from './activar-usuarios.component';

describe('ActivarUsuariosComponent', () => {
  let component: ActivarUsuariosComponent;
  let fixture: ComponentFixture<ActivarUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivarUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
