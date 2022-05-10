import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesWallComponent } from './images-wall.component';

describe('ImagesWallComponent', () => {
  let component: ImagesWallComponent;
  let fixture: ComponentFixture<ImagesWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
