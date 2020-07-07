import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from '../recipes/recipe.model';
import { DataStoreService } from './data-store.service';
import { RecipeService } from './recipes.service';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStoreService: DataStoreService, private recipeService: RecipeService ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if(!recipes.length) {
      return this.dataStoreService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
