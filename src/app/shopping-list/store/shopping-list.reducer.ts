import { Ingredient } from "../../shared/ingredient.model";
import * as shoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}
const initialState: State = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export interface AppState {
  shoppingList: State;
}


export function shoppingListReducer(state = initialState, action: shoppingListActions.ShoppingListTypes) {
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
      oldIgs.splice(state.editedIngredientIndex, 1);
      oldIgs.push(action.payload.ingredient);
      return {
        ...state,
        ingredients: oldIgs,
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    case shoppingListActions.DELETE_INGREDIENT:
      const ingredients = [...state.ingredients];
      ingredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    case shoppingListActions.START_EDIT:
      console.log(action.payload);
      return {
        ...state,
        editedIngredient: { ...state.ingredients[action.payload] },
        editedIngredientIndex: action.payload
      }
    case shoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      }
    default:
      return state;
  }
}
