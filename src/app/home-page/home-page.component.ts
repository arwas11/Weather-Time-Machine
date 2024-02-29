import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';
import { PastWeatherComponent } from '../past-weather/past-weather.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { UserCommentsComponent } from '../user-comments/user-comments.component';
import { SignupLoginFormComponent } from '../signup-login-form/signup-login-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SignupLoginFormComponent,
    LoginFormComponent,
    CurrentWeatherComponent,
    PastWeatherComponent,
    UserCommentsComponent,
    FooterComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  title = 'Weather Time Machine ';
}
