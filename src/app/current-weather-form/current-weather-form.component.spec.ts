import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherFormComponent } from './current-weather-form.component';

describe('CurrentWeatherFormComponent', () => {
  let component: CurrentWeatherFormComponent;
  let fixture: ComponentFixture<CurrentWeatherFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentWeatherFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentWeatherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
