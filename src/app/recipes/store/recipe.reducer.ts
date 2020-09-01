import { Recipe } from '../recipe.model';
import * as fromRecipeActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function reducers(
  state = initialState,
  action: fromRecipeActions.recipeActionTypes
) {
  switch (action.type) {
    case fromRecipeActions.ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload.recipe] };
    case fromRecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload.recipes],
      };
    case fromRecipeActions.UPDATE_RECIPE:
      const recipes = [...state.recipes];
      const index = +action.payload.id;
      const newRecipe = action.payload.recipe;
      recipes[index] = newRecipe;
      return {
        ...state,
        recipes,
      };
    case fromRecipeActions.DELETE_RECIPE:
      const newRecipes = [...state.recipes];
      newRecipes.splice(+action.payload.id, 1);
      console.log({newRecipes});
      return {
        ...state,
        recipes: newRecipes
      }
    default:
      return state;
  }
}
