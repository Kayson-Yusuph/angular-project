import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from './recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class DataStoreService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
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
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      const token = user.token;
      console.log(user);
      return this.http.get<Recipe[]>(
        'https://angular-app-268d0.firebaseio.com/recipes.json', {
          params: new HttpParams().set('auth', token)
        });
    }), map(res => {
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
