import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {

  @Output('recipeNavigate') navigateToRecipes = new EventEmitter();
  @Output('shoppingListNavigate') navigateToShoppingList = new EventEmitter();

  onRecipeNavigate() {
    this.navigateToRecipes.emit();
  }
  onShoppingListNavigate() {
    this.navigateToShoppingList.emit();
  }

}
