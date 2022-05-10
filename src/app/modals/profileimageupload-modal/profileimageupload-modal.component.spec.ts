import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileimageuploadModalComponent } from './profileimageupload-modal.component';

describe('ProfileimageuploadModalComponent', () => {
  let component: ProfileimageuploadModalComponent;
  let fixture: ComponentFixture<ProfileimageuploadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileimageuploadModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileimageuploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
