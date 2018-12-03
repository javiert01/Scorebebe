import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonatoComponent } from './neonato.component';

describe('NeonatoComponent', () => {
  let component: NeonatoComponent;
  let fixture: ComponentFixture<NeonatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeonatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
