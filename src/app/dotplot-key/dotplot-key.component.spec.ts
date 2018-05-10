import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotplotKeyComponent } from './dotplot-key.component';

describe('DotplotKeyComponent', () => {
  let component: DotplotKeyComponent;
  let fixture: ComponentFixture<DotplotKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotplotKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotplotKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
