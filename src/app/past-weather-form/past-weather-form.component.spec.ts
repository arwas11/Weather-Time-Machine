import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastWeatherFormComponent } from './past-weather-form.component';

describe('PastWeatherFormComponent', () => {
  let component: PastWeatherFormComponent;
  let fixture: ComponentFixture<PastWeatherFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastWeatherFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PastWeatherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
