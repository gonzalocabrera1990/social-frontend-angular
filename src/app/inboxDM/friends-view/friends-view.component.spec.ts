import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsViewComponent } from './friends-view.component';

describe('FriendsViewComponent', () => {
  let component: FriendsViewComponent;
  let fixture: ComponentFixture<FriendsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
