import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateHeatmapComponent } from './plate-heatmap.component';

describe('PlateHeatmapComponent', () => {
  let component: PlateHeatmapComponent;
  let fixture: ComponentFixture<PlateHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateHeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
