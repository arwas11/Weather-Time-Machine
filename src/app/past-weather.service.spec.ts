import { TestBed } from '@angular/core/testing';

import { PastWeatherService } from './past-weather.service';

describe('PastWeatherService', () => {
  let service: PastWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
