import { Injectable } from '@angular/core';
import { CurrentConditions } from './current-conditions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { theCurrentKey } from './theCurrentKey';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherService {

  private apiKey = theCurrentKey;
  
  currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=imperial`;
  // lat=${this.lat}&lon=${this.lon}&

  constructor(private http: HttpClient) {}

  getCurrentConditions(city: string): Observable<CurrentConditions> {
    let options = city
      ? { params: new HttpParams().append('q', city)}
      : {};

    return this.http.get<CurrentConditions>(this.currentWeatherUrl, options)
  }
}
