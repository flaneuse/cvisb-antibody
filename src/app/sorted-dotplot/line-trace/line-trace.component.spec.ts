import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineTraceComponent } from './line-trace.component';

describe('LineTraceComponent', () => {
  let component: LineTraceComponent;
  let fixture: ComponentFixture<LineTraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineTraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineTraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
