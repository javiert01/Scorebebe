import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGruposCieComponent } from './info-grupos-cie.component';

describe('InfoGruposCieComponent', () => {
  let component: InfoGruposCieComponent;
  let fixture: ComponentFixture<InfoGruposCieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoGruposCieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoGruposCieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
