import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { AddIngredients } from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import { AppState } from '../store/app.reducers';

@Injectable({providedIn: 'root'})
export class RecipeService {
  updateRecipes = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor( private store: Store<AppState>) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.updateRecipes.next(this.recipes.slice());
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.updateRecipes.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.updateRecipes.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.updateRecipes.next(this.recipes.slice());
    return this.recipes.length - 1;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new AddIngredients({ingredients}))
  }
}
