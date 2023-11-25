import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupLoginFormComponent } from '../signup-login-form/signup-login-form.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SignupLoginFormComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
