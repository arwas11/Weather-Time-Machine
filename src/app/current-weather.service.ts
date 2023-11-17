import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  constructor() { }

  submitLocation(location: string) {
    // log with hard coded data
    // console.log(
    //   `Home application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}`
    // );
    console.log(location);
  }
}
