import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapScalebarComponent } from './heatmap-scalebar.component';

describe('HeatmapScalebarComponent', () => {
  let component: HeatmapScalebarComponent;
  let fixture: ComponentFixture<HeatmapScalebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatmapScalebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapScalebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
