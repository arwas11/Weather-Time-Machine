import { TestBed } from '@angular/core/testing';

import { AddCommentsService } from './add-comments.service';

describe('AddCommentsService', () => {
  let service: AddCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
