import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortedDotplotComponent } from './sorted-dotplot.component';

describe('SortedDotplotComponent', () => {
  let component: SortedDotplotComponent;
  let fixture: ComponentFixture<SortedDotplotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortedDotplotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortedDotplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
