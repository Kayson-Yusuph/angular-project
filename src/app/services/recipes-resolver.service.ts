import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

import { Recipe } from '../recipes/recipe.model';
import { AppState } from '../store/app.reducers';
import * as RecipeActions from '../recipes/store/recipe.actions';
@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new RecipeActions.FetchRecipes());
    return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
  }
}
