import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { CurrentConditions } from '../current-conditions';

@Component({
  selector: 'app-current-weather-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './current-weather-form.component.html',
  styleUrl: './current-weather-form.component.css'
})
export class CurrentWeatherFormComponent {

  location : string = '';

  submitted = false;

  onSubmit() { 
    this.submitted = true; 
  }


}
