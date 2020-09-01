import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as RecipeActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import { AppState } from '../../store/app.reducers';

@Injectable()
export class RecipeEffects {

  @Effect()
  fetchRecipes = this.actions$.pipe(ofType(RecipeActions.FETCH_RECIPES),
  switchMap(() => {
    console.log('fetching now');
    return this.http.get<Recipe[]>(
      'https://angular-app-268d0.firebaseio.com/recipes.json')
  }),map(res => {
    return res.map(rsp => {
      const ingredients = rsp.ingredients ? rsp.ingredients : [];
      return { ...rsp, ingredients };
    });
  }),map((recipes) => {
    return new RecipeActions.SetRecipes({recipes});
  }));

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<AppState>) {}
}
