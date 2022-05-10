import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartItemsComponent } from './start-items.component';

describe('StartItemsComponent', () => {
  let component: StartItemsComponent;
  let fixture: ComponentFixture<StartItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
