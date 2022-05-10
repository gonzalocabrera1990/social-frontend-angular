import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartStoryComponent } from './start-story.component';

describe('StartStoryComponent', () => {
  let component: StartStoryComponent;
  let fixture: ComponentFixture<StartStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
