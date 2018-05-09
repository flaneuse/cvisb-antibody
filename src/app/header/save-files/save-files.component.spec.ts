import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFilesComponent } from './save-files.component';

describe('SaveFilesComponent', () => {
  let component: SaveFilesComponent;
  let fixture: ComponentFixture<SaveFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
