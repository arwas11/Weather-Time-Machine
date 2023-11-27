import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SignupLoginService } from '../signup-login.service';
import { User } from '../user';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-signup-login-form',
  standalone: true,
  imports: [
    CommonModule,
    LoginFormComponent,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
  ],
  templateUrl: './signup-login-form.component.html',
  styleUrl: './signup-login-form.component.css',
})

//utilizing angular's reactive forms
export class SignupLoginFormComponent implements OnInit {

  user: any;

  constructor(private signupLoginService: SignupLoginService) {}

  username = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(25),
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(25),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(25),
  ]);

  userSignUpInfo = new FormGroup({
    username: this.username,
    email: this.email,
    password: this.password,
  });

  ngOnInit(): void {
    
  }

  signUpDiv = true;
  loginDiv = true;
  submitted = false;

  toggleSignUp(){
    this.signUpDiv = !this.signUpDiv;
  }

  toggleLogin(){
    this.loginDiv = !this.loginDiv;
  }


  signUpOnSubmit() {
    this.signUpDiv = true;
    let userInfo = this.userSignUpInfo.value
    console.log("in the component ", userInfo);
    console.warn(this.userSignUpInfo.value);

    // TODO: Use EventEmitter with form value
    // Use EventEmitter to keep the form encapsulated and to provide the form value outside the component.
    // The submit event is emitted by the form tag using the built-in DOM event.
    // You trigger the event by clicking a button with submit
    // console.warn(this.userSignUpInfo.value);

    this.signupLoginService.addUser(userInfo).subscribe(user => {
      this.user = user
    })
    
    // to clear input after submitting
      this.userSignUpInfo.reset()

  }


}
