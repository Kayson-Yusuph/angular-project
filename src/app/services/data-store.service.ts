import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RecipeService } from './recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../store/app.reducers';

@Injectable({ providedIn: 'root' })
export class DataStoreService {
  recipes: Recipe[];
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://angular-app-268d0.firebaseio.com/recipes.json', recipes)
      .subscribe((res) => {
      }, (error) => {
        console.error(error);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://angular-app-268d0.firebaseio.com/recipes.json').pipe(map(res => {
        console.log(res);
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
