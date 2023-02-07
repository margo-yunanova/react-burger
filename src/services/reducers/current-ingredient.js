import {
  SHOW_INGREDIENT_MODAL,
  HIDE_INGREDIENT_MODAL
 } from "../actions/current-ingredient";

const initialState = {
  ingredient: {},
  currentIngredientVisible: false,
}

export const currentIngredient = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_INGREDIENT_MODAL: {
      return {
        ingredient: action.payload,
        currentIngredientVisible: true,
      }
    }

    case HIDE_INGREDIENT_MODAL: {
      return {
        ingredient: {},
        currentIngredientVisible: false,
      }
    }

    default: return state;
  }
}
