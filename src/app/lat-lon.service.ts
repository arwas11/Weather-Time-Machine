import { Injectable } from '@angular/core';
import { CurrentWeatherFormComponent } from './current-weather-form/current-weather-form.component';

@Injectable({
  providedIn: 'root',
})
export class LatLonService {

  
  constructor(
    private currentWeatherFormComponent: CurrentWeatherFormComponent
    ) {
      this.lat = currentWeatherFormComponent.lat[0]
      this.lon = currentWeatherFormComponent.lon[0]
    }
    
  lat: number = this.currentWeatherFormComponent.lat[0];
  lon: number = this.currentWeatherFormComponent.lon[0];

  
}
