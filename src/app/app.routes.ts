import { Routes } from '@angular/router';
import { CurrentWeatherComponent } from './weather-time-machineonent';
import { PastWeatherComponent } from './past-weather/past-weather.component';
import { SignupLoginFormComponent } from './signup-login-form/signup-login-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SavedListComponent } from './saved-list/saved-list.component';


export const routes: Routes = [
    {
        path: 'weather-time-machine',
        title: 'weather-time-machine',
        component: HomePageComponent,
    },
    // {
    //     path: 'signup-login',
    //     title: 'signup-login',
    //     component: SignupLoginFormComponent,
    // },
    // {
    //     path: 'user-profile',
    //     title: '--user-- profile',
    //     component: UserProfileComponent,
    // },
    // {
    //     path: 'saved-list',
    //     title: 'saved-list',
    //     component: SavedListComponent,
    // },
    // {
    //     path: 'saved-list/:city',
    //     title: '--saved item--',
    //     component: SavedListComponent,
    // },
    {
        path: '**', 
        title: "weather-time-machine",
        component: HomePageComponent 
    }
];
