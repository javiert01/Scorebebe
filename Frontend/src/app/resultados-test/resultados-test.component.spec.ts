import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosTestComponent } from './resultados-test.component';

describe('ResultadosTestComponent', () => {
  let component: ResultadosTestComponent;
  let fixture: ComponentFixture<ResultadosTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
