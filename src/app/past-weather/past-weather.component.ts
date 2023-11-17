import { Component } from '@angular/core';
import { CommonModule, LowerCasePipe, NgFor, NgIf } from '@angular/common';
import subDays from 'date-fns/subDays'
import { PastConditions } from '../past-conditions';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-past-weather',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule, LowerCasePipe],
  templateUrl: './past-weather.component.html',
  styleUrl: './past-weather.component.css'
})
export class PastWeatherComponent {

  fetchedPastData? : PastConditions | string;

  submitDate(): void{
    this.fetchedPastData = 'past weather method submitted'
    console.log(this.fetchedPastData);

   }

}
