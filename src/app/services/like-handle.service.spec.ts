import { TestBed } from '@angular/core/testing';

import { LikeHandleService } from './like-handle.service';

describe('LikeHandleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LikeHandleService = TestBed.get(LikeHandleService);
    expect(service).toBeTruthy();
  });
});
