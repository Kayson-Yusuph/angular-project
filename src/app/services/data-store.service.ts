import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from './recipes.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStoreService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://angular-app-268d0.firebaseio.com/recipes.json', recipes)
        .subscribe((res) => {
          console.log(res);
        },(error) => {
          console.error('Failed to save data: ' + error.message);
        });
  }

  fetchRecipes() {
    this.http.get<Recipe[]>('https://angular-app-268d0.firebaseio.com/recipes.json')
      .subscribe((res) => {
        this.recipeService.setRecipes(res);
      }, (error) => {
        console.error('Failed to fetch data: ' + error.message);
      });
  }
}
