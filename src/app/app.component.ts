import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showRecipes = true;

  onNavigation(evt: boolean) {
    this.showRecipes = evt;
  }
}
