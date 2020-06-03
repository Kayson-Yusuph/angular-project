import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input('recipeItem') recipe: Recipe;
  @Output('selectRecipe') showItemDetails = new EventEmitter<void>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void { }

  onSelected() {
    this.recipeService.selectRecipe.emit(this.recipe);
  }

}
