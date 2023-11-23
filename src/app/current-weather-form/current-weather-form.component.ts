import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { CurrentConditions } from '../current-conditions';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { theCurrentKey } from '../theCurrentKey';
import { CurrentWeatherService } from '../current-weather.service';
import { LatLonService } from '../lat-lon.service';

@Component({
  selector: 'app-current-weather-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './current-weather-form.component.html',
  styleUrl: './current-weather-form.component.css',
})
export class CurrentWeatherFormComponent {
  //pass these props to past weather form after fetch is successful
  //needed because the api query params requires them
  lat: number[] = [];
  lon: number[] = [];

  assignAvailableLatLon(){
    if (this.currentConditionsData[0].coord.lat && this.lat[0]){
      this.lat[0] = this.currentConditionsData[0].coord.lat
      this.lon[0] = this.currentConditionsData[0].coord.lon
    }
  }
  constructor(private currentWeatherService: CurrentWeatherService, 
    // private latLonService : LatLonService
    ) {}
  // mock data to test two way binding
  location: string = '';
  
  

  //-------fetching data-------
  currentConditionsData: CurrentConditions[] = [];

  // add error handling
  getCurrentConditions(city: string) {
    if (city) {
      city.trim();
      this.currentWeatherService
        .getCurrentConditions(city)
        .subscribe((currentData) => {
          // console.log(currentData);
          //assign incoming data to the array
          this.currentConditionsData = [currentData];
          //assigning lat and lon to send to past weather form
          this.lat[0] = this.currentConditionsData[0].coord.lat;
          this.lon[0] = this.currentConditionsData[0].coord.lon;
          console.log('in current, lat is ', this.lat[0]);
          console.log('in current, lon is ',this.lon[0]);
          // data to display
          this.currentConditionsData[0].name = currentData.name;
          this.currentConditionsData[0].sys.country = currentData.sys.country;
          this.currentConditionsData[0].weather[0].description = currentData.weather[0].description;
          this.currentConditionsData[0].main.temp = currentData.main.temp
          this.currentConditionsData[0].main.feels_like = currentData.main.feels_like;
          // add logic to not read rain and snow if undefined
          // this.currentConditionsData[0].rain["1h"] = currentData.rain["1h"];
          // this.currentConditionsData[0].snow['1h'] = currentData.snow['1h'];
          this.currentConditionsData[0].wind.speed = currentData.wind.speed;
          // console.log('===', this.currentConditionsData[0].coord.lat);

        });
    }
  }
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
}
