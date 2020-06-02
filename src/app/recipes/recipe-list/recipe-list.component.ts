import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A Test recipe', 'This is a simple recipe test', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/caponata-pasta_1.jpg'),
    new Recipe('A New recipe', 'This is a next recipe test', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/caponata-pasta_1.jpg')
  ];

  detailedRecipe: Recipe;
  @Output() showItemDetails = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onShowRecipeDetails(item: Recipe) {
    this.showItemDetails.emit(item);
  }

}
