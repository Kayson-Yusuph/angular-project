import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from './recipes.service';

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
          console.log('Failed to save data: ' + error.message);
        });
  }
}
