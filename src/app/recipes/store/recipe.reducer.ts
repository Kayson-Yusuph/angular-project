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
    case fromRecipeActions.ADD_RECIPES:
      return { ...state, recipes: [...state.recipes, ...action.payload.recipes] };
    case fromRecipeActions.UPDATE_RECIPE:
      const recipes = [...state.recipes];
      const index = action.payload.id;
      const newRecipe = action.payload.recipe;
      recipes[index] = newRecipe;
      return {
        ...state,
        recipes,
      }
    default:
      return state;
  }
}
