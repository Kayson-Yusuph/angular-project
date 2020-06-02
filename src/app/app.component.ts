import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showRecipes = true;
  navigateToRecipesPage() {
    this.showRecipes = true;
  }
  navigateToShoppingListPage() {
    this.showRecipes = false;
  }
}
