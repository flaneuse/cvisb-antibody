import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeFilesComponent } from './analyze-files.component';

describe('AnalyzeFilesComponent', () => {
  let component: AnalyzeFilesComponent;
  let fixture: ComponentFixture<AnalyzeFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
