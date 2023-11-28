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
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  user: any;

  constructor(private loginService: LoginService) {}
  userLoginInfo = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
  }
  submitted = false;

  loginDiv = true;

  toggleLogin() {
    this.loginDiv = !this.loginDiv;
  }

  loginOnSubmit() {
    this.loginDiv = true;
    let userInfo = this.userLoginInfo.value;
    let username = this.userLoginInfo.value.username;
    let password = this.userLoginInfo.value.password;
    console.log('in the component ', username);
    console.warn(this.userLoginInfo.value.username);

    // TODO: Use EventEmitter with form value
    // Use EventEmitter to keep the form encapsulated and to provide the form value outside the component.
    // The submit event is emitted by the form tag using the built-in DOM event.
    // You trigger the event by clicking a button with submit
    // console.warn(this.userSignUpInfo.value);

    this.loginService.getUser(username).subscribe((user) => {
      this.user = user;
    });

    // to clear input after submitting
    this.userLoginInfo.reset();
  }
}
