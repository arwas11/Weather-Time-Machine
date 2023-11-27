import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { CurrentConditions } from '../current-conditions';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { theCurrentKey } from '../theCurrentKey';
import { CurrentWeatherService } from '../current-weather.service';

@Component({
  selector: 'app-current-weather-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './current-weather-form.component.html',
  styleUrl: './current-weather-form.component.css',
})
export class CurrentWeatherFormComponent implements OnInit {

  currentConditionsData: CurrentConditions[] = [];

  constructor(public currentWeatherService: CurrentWeatherService) {}
  // mock data to test two way binding
  location: string = '';

  testLatLon() {
    this.currentWeatherService.testLatLon();
    // console.log('this is direct from service in current', this.currentWeatherService.currentConditionsData[0]);
    console.log('this is data in current', this.currentConditionsData);
  }

  //-------fetching data in service-------

  ngOnInit(): void {
    this.getCurrentConditions()
    this.currentWeatherService.getFetchedData().subscribe(currentData => {
      this.currentConditionsData[0] = currentData;
      console.log('this is data in current', this.currentConditionsData);
      //assigning lat and lon to send to past weather form
      // data to display
      if (this.currentConditionsData[0]){
        this.currentConditionsData[0].name = currentData.name;
        // this.city = currentData.name;
        this.currentConditionsData[0].sys.country = currentData.sys.country;
        this.currentConditionsData[0].weather[0].description = currentData.weather[0].description;
        this.currentConditionsData[0].main.temp = currentData.main.temp
        this.currentConditionsData[0].main.feels_like = currentData.main.feels_like;
  
        // add logic to not read rain and snow if undefined
        // this.currentConditionsData[0].rain["1h"] = currentData.rain["1h"];
        // this.currentConditionsData[0].snow['1h'] = currentData.snow['1h'];
        this.currentConditionsData[0].wind.speed = currentData.wind.speed;
        console.log('inside current===', this.currentConditionsData[0]);
      }

    })
  }
  // add error handling
  getCurrentConditions(city?: string) {
    if (city) {
      city.trim();
      this.currentWeatherService.getCurrentConditions(city)
    }
  }

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
}
