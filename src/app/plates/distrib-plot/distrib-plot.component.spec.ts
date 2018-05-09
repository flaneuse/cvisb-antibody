import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribPlotComponent } from './distrib-plot.component';

describe('DistribPlotComponent', () => {
  let component: DistribPlotComponent;
  let fixture: ComponentFixture<DistribPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistribPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
