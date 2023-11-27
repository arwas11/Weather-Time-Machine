import { Injectable } from '@angular/core';
import { CurrentConditions } from './current-conditions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { theCurrentKey } from './theCurrentKey';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherService {

  private apiKey = theCurrentKey;
  
  currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=imperial`;

  private fetchedCurrentConditionsData: any;
  private dataSubject = new BehaviorSubject<any>(null);

  //pass these props to past weather form after fetch is successful
  //needed because the api query params requires them
  //do they need "private"?
  lat: number = 0;
  lon: number = 0;
  city: string = ''

//test if the props have the fetched data
  testLatLon(){
    console.log('in current service, lat is ', this.lat);
    console.log('in current service, lon is ',this.lon);
  }

  constructor(private http: HttpClient) {}

    //-------fetching data-------

  getCurrentConditions(city: string): void {
    let options = city
      ? { params: new HttpParams().append('q', city)}
      : {};

     this.http.get<CurrentConditions>(this.currentWeatherUrl, options).subscribe((currentData) => {
      //assign incoming data to the array
      this.fetchedCurrentConditionsData = currentData;
      console.log('inside service===', this.fetchedCurrentConditionsData);
      if (this.fetchedCurrentConditionsData){
        this.lat = this.fetchedCurrentConditionsData.coord.lat;
        this.lon = this.fetchedCurrentConditionsData.coord.lon;
        this.city = this.fetchedCurrentConditionsData.name      
      }
      this.dataSubject.next(this.fetchedCurrentConditionsData)
      
    });
  }
  
  getFetchedData(){
    return this.dataSubject.asObservable();
  }

}
