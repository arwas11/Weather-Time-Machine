import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastConditions } from '../past-conditions';
import { FormsModule } from '@angular/forms';
import { subDays } from 'date-fns';
import format from 'date-fns/format';
@Component({
  selector: 'app-past-weather-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './past-weather-form.component.html',
  styleUrl: './past-weather-form.component.css',
})
export class PastWeatherFormComponent {
  fetchedPastData?: PastConditions | string;

  date: Date = new Date();

  dateDisplayFormat = format(this.date, 'MM/dd/yyyy')

  //these two props to set min date input to be -5 days from now
  subDate = subDays(new Date(), 5)
  maxDate = format(this.subDate, 'yyyy-MM-dd')


  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

}
