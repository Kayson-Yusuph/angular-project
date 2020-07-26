import { Ingredient } from "../../shared/ingredient.model";
import * as shoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ]
}



export function shoppingListReducer(state = initialState, action: shoppingListActions.AddIngredient | shoppingListActions.AddIngredients | shoppingListActions.DeleteIngredient | shoppingListActions.UpdateIngredient) {
  switch (action.type) {
    case shoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload.ingredient]
      }
    case shoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload.ingredients]
      }
    case shoppingListActions.UPDATE_INGREDIENT:
      const oldIgs = [...state.ingredients];
      oldIgs.splice(action.payload.index, 1);
      oldIgs.push(action.payload.ingredient);
      return {
        ...state,
        ingredients: oldIgs
      }
    case shoppingListActions.DELETE_INGREDIENT:
      const ingredients = [...state.ingredients];
      ingredients.splice(action.payload.index, 1);
      return {
        ...state,
        ingredients
      }
    default:
      return state;
  }
}
