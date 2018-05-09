import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapKeyComponent } from './heatmap-key.component';

describe('HeatmapKeyComponent', () => {
  let component: HeatmapKeyComponent;
  let fixture: ComponentFixture<HeatmapKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatmapKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
