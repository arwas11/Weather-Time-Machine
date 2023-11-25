import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastConditions } from '../past-conditions';
import { FormsModule } from '@angular/forms';
import { subDays } from 'date-fns';
import format from 'date-fns/format';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PastWeatherService } from '../past-weather.service';
import { CurrentWeatherFormComponent } from '../current-weather-form/current-weather-form.component';
import { LatLonService } from '../lat-lon.service';

@Component({
  selector: 'app-past-weather-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, CurrentWeatherFormComponent],
  providers: [CurrentWeatherFormComponent],
  templateUrl: './past-weather-form.component.html',
  styleUrl: './past-weather-form.component.css',
})


export class PastWeatherFormComponent {
  //mock date to test two-way binding & set input color
  date = undefined;
  // dateDisplayFormat = format(this.date, 'MM/dd/yyyy');

  //these two props to set min date input to be -5 days from now
  subDate = subDays(new Date(), 5);
  maxDate = format(this.subDate, 'yyyy-MM-dd');

   constructor(
    private pastWeatherService: PastWeatherService,
    public currentWeatherFormComponent: CurrentWeatherFormComponent,
    // private latLonService : LatLonService
  ) {}

    //getting and assigning lat and lon from current component
  lat: number = 0;
  lon: number = 0;

  // assignLatLon(){
  //   if (this.currentWeatherFormComponent.lat[0]){
  //     this.lat = this.currentWeatherFormComponent.lat[0]
  //     this.lon = this.currentWeatherFormComponent.lon[0]
  //   }
  // }
  

  // test what is inside initial date input
  testInput(date: string){
    console.log(date);
    if (this.currentWeatherFormComponent.lat[0]){
      this.lat = this.currentWeatherFormComponent.lat[0]
      this.lon = this.currentWeatherFormComponent.lon[0]
      console.log('lat: ', this.lat , 'lon: ', this.lon );
    }
    console.log(this.submitted);
  }
  // to toggle between form and data display divs
  submitted = false;
  onSubmit() {
      this.submitted = true;
  }
  //------fetch weather data ------


  pastConditionsData: PastConditions[] = [];

  // add error handling
  getPastConditions(date: string) {
    
    if (date && this.lat && this.lon) {
      date.trim();
      let inputtedDate = new Date(date);
      const formattedDate = format(inputtedDate, 'yyyy-MM-dd');

      //sending the lat + lon to past weather query params
      this.pastWeatherService
        .getPastConditions(formattedDate, this.lat, this.lon)
        .subscribe((pastData) => {
          this.pastConditionsData = [pastData];
          //-----assigning data to props----
          //weather units
          this.pastConditionsData[0].daily_units.temperature_2m_max =
            pastData.daily_units.temperature_2m_max;
          this.pastConditionsData[0].daily_units.rain_sum =
            pastData.daily_units.rain_sum;
          this.pastConditionsData[0].daily_units.wind_speed_10m_max =
            pastData.daily_units.wind_speed_10m_max;
          //date
          this.pastConditionsData[0].daily.time[0] = pastData.daily.time[0];
          //conditions
          this.pastConditionsData[0].daily.temperature_2m_max[0] =
            pastData.daily.temperature_2m_max[0];
          this.pastConditionsData[0].daily.temperature_2m_min[0] =
            pastData.daily.temperature_2m_min[0];
          this.pastConditionsData[0].daily.rain_sum[0] =
            pastData.daily.rain_sum[0];
          this.pastConditionsData[0].daily.snowfall_sum[0] =
            pastData.daily.snowfall_sum[0];
          this.pastConditionsData[0].daily.wind_speed_10m_max[0] =
            pastData.daily.wind_speed_10m_max[0];
        });
    }
  }

  
}
