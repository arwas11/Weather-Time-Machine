// import { Injectable } from '@angular/core';
// import { CurrentWeatherFormComponent } from './current-weather-form/current-weather-form.component';

// @Injectable({
//   providedIn: 'root',
// })
// export class LatLonService {
//   //CAN'T SHARE LAT & LON THIS WAY because:
//     // the current weather component is not injectable so I cannont provide it here
//     // I will need to fetch data here and get the info I need then pass it to past weather component, this is cann't be done because I can't do double fetching at the same time and don't know if I can use .subscribe here to get lat an lon here then pass it.
//     // I should check the .pipe and NgRX

  
//   constructor(
//     private currentWeatherFormComponent: CurrentWeatherFormComponent
//     ) {
//       this.lat = currentWeatherFormComponent.lat[0]
//       this.lon = currentWeatherFormComponent.lon[0]
//     }
    
//   lat: number = this.currentWeatherFormComponent.lat[0];
//   lon: number = this.currentWeatherFormComponent.lon[0];

  
// }
