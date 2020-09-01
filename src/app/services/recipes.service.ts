import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { AddIngredients } from '../shopping-list/store/shopping-list.actions';
import { AppState } from '../store/app.reducers';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Injectable({providedIn: 'root'})
export class RecipeService {
  updateRecipes = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor( private store: Store<AppState>) {
    this.store.select('recipe').pipe(map(resData => resData.recipes)).subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  setRecipes(recipes: Recipe[]) {
    this.store.dispatch(new RecipeActions.SetRecipes({recipes}));
    // this.recipes = recipes;
    // this.updateRecipes.next(this.recipes.slice());
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
    this.store.dispatch(new RecipeActions.UpdateRecipe({id: index, recipe}));
    // this.recipes[index] = recipe;
    // this.updateRecipes.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.store.dispatch(new RecipeActions.AddRecipe({recipe}))
    // this.recipes.push(recipe);
    // this.updateRecipes.next(this.recipes.slice());
    // return this.recipes.length - 1;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new AddIngredients({ingredients}))
  }
}
