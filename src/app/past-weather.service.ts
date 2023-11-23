import { Injectable } from '@angular/core';
import { PastConditions } from './past-conditions';
import { PastWeatherComponent } from './past-weather/past-weather.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})

//Using the HttpClient to GET data from the API
export class PastWeatherService {
  private pastWeatherUrl =
    'https://archive-api.open-meteo.com/v1/archive?&daily=temperature_2m_max,temperature_2m_min,rain_sum,snowfall_sum,wind_speed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch';

  constructor(private http: HttpClient) {}

  public getPastConditions(
    date: string,
    lat: number,
    lon: number
  ): Observable<PastConditions> {
    return this.http.get<PastConditions>(this.pastWeatherUrl, {
      observe: 'body',
      responseType: 'json',
      params: new HttpParams().appendAll({
        start_date: date,
        end_date: date,
        latitude: lat,
        longitude: lon,
      }),
    })
  }
}
