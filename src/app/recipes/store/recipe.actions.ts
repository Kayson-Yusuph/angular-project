import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const ADD_RECIPE = '[Recipe] Add a Recipe';
export const ADD_RECIPES = '[Recipe] Add Recipes';
export const UPSERT_RECIPE = '[Recipe] Upsert a Recipe';
export const UPSERT_RECIPES = '[Recipe] Upsert Recipes';
export const DELETE_RECIPE = '[Delete] Delete a Recipe';
export const DELETE_RECIPES = '[Delete] Delete Recipes';

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: { recipe: Recipe }) {}
}

export class AddRecipes implements Action {
  readonly type = ADD_RECIPES;

  constructor(public payload: { recipes: Recipe[] }) {}
}

export class UpsertRecipe implements Action {
  readonly type = UPSERT_RECIPE;

  constructor(public payload: { recipe: Recipe }) {}
}

export class UpsertRecipes implements Action {
  readonly type = UPSERT_RECIPES;

  constructor(public payload: { recipes: Recipe[] }) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: { id: string }) {}
}

export class DeleteRecipes implements Action {
  readonly type = DELETE_RECIPES;

  constructor(public payload: { recipes: String[] }) {}
}

export type recipeActionTypes =
  | AddRecipe
  | AddRecipes
  | UpsertRecipe
  | UpsertRecipes
  | DeleteRecipe
  | DeleteRecipes;
