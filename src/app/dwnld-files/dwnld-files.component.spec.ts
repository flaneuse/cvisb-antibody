import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwnldFilesComponent } from './dwnld-files.component';

describe('DwnldFilesComponent', () => {
  let component: DwnldFilesComponent;
  let fixture: ComponentFixture<DwnldFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwnldFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwnldFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
