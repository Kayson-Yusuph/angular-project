import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input('recipeItem') recipe: Recipe;
  @Output('selectRecipe') showItemDetails = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  onSelected() {
    this.showItemDetails.emit();
  }

}
