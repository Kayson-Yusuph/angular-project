import { Action } from '@ngrx/store';

import { Ingredient } from "../shared/ingredient.model";

const initialState = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ]
}

function shoppingListReducer(state = initialState, action: Action) {
  switch(action.type) {

  }
}
