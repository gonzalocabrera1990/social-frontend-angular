import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpageOutloginComponent } from './userpage-outlogin.component';

describe('UserpageOutloginComponent', () => {
  let component: UserpageOutloginComponent;
  let fixture: ComponentFixture<UserpageOutloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpageOutloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpageOutloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
