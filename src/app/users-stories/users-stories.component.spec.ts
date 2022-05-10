import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersStoriesComponent } from './users-stories.component';

describe('UsersStoriesComponent', () => {
  let component: UsersStoriesComponent;
  let fixture: ComponentFixture<UsersStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersStoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
