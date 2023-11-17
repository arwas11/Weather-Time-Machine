import { Component } from '@angular/core';
import { CommonModule, LowerCasePipe, NgFor, NgIf } from '@angular/common';
import { error } from 'console';
import { CurrentConditions } from '../current-conditions';
import { FormControl, FormsModule } from '@angular/forms';
import { CurrentWeatherService } from '../current-weather.service';
@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule, LowerCasePipe],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css'
})
export class CurrentWeatherComponent {

  locationFormInput= new FormControl('');

  fetchedCurrentData?: CurrentConditions | string;

 submitLocation(): void{
  this.fetchedCurrentData = 'current weather method submitted'
  console.log(this.fetchedCurrentData);
 }

}



