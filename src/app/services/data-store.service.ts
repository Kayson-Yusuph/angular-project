import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from './recipes.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStoreService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://angular-app-268d0.firebaseio.com/recipes.json', recipes)
      .subscribe((res) => {
        console.log(res);
      }, (error) => {
        console.error(error);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://angular-app-268d0.firebaseio.com/recipes.json')
      .pipe(map(res => {
        return res.map(rsp => {
          const ingredients = rsp.ingredients ? rsp.ingredients : [];
          return { ...rsp, ingredients };
        });
      }),
        tap((res) => {
          this.recipeService.setRecipes(res);
      }));
  }
}
