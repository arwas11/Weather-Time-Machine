import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-saved-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './saved-list.component.html',
  styleUrl: './saved-list.component.css'
})
export class SavedListComponent {

  //Update the component to have an Input matching the name of the parameter.
  @Input()
  set id(heroId: string) {
    // this.hero$ = this.service.getHero(heroId);
  }
}
