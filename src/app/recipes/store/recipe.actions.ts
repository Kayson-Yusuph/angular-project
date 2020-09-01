import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const ADD_RECIPE = '[Recipe] Add a Recipe';
export const ADD_RECIPES = '[Recipe] Add Recipes';
export const SET_RECIPES = '[Recipe] Set Recipes';
export const UPDATE_RECIPE = '[Recipe] Update a Recipe';
export const DELETE_RECIPE = '[Recipe] Delete a Recipe';
export const FETCH_RECIPES = '[Recipe] Fetch Recipes';

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: { recipe: Recipe }) {}
}

export class AddRecipes implements Action {
  readonly type = ADD_RECIPES;

  constructor(public payload: { recipes: Recipe[] }) {}
}
export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: { recipes: Recipe[] }) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { id: number, recipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: { id: string }) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export type recipeActionTypes =
  | AddRecipe
  | AddRecipes
  | SetRecipes
  | UpdateRecipe
  | DeleteRecipe;
