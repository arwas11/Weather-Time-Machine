import { TestBed } from '@angular/core/testing';

import { LatLonService } from './lat-lon.service';

describe('LatLonService', () => {
  let service: LatLonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatLonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
