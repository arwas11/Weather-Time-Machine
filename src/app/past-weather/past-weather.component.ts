import { Component } from '@angular/core';
import { CommonModule, LowerCasePipe, NgFor, NgIf } from '@angular/common';
import subDays from 'date-fns/subDays';
import { PastConditions } from '../past-conditions';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { PastWeatherFormComponent } from '../past-weather-form/past-weather-form.component';

@Component({
  selector: 'app-past-weather',
  standalone: true,
  imports: [
    PastWeatherFormComponent,
    CommonModule,
    NgFor,
    NgIf,
    FormsModule,
    LowerCasePipe,
  ],
  templateUrl: './past-weather.component.html',
  styleUrl: './past-weather.component.css',
})
export class PastWeatherComponent {}
