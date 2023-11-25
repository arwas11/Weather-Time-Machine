import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validator } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-signup-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './signup-login-form.component.html',
  styleUrl: './signup-login-form.component.css'
})

//utilizing angular's reactive forms
export class SignupLoginFormComponent {
  
  
  userSignUpInfo = new FormGroup({
    // adding input validators
    username: new FormControl('username'),
    email: new FormControl('email'),
    password: new FormControl('password')
    
  })
  
  userLoginInfo = new FormGroup({
    username: new FormControl('username'),
    password: new FormControl('password')
  })

  clearUsername(){
    // this.userSignUpInfo.setValue('')
  }
  signUpOnSubmit(){
    // TODO: Use EventEmitter with form value
    // Use EventEmitter to keep the form encapsulated and to provide the form value outside the component.
    // The submit event is emitted by the form tag using the built-in DOM event. 
    // You trigger the event by clicking a button with submit
  console.warn(this.userSignUpInfo.value);

    // to clear input after clicking
      

  }

  loginOnSubmit(){

  }
}
