import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/ingredients";

const initialState = {
  listBurgerIngredients: {
    success: null,
    ingredients: [],
  },
  listBurgerСonstructor: null,
  currentIngredient: null,
  createdOrder: null,
};

export const ingredients = (state = initialState, action) => {

  switch (action.type) {
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      const { success, ingredients } = action.payload;
      return {
        ...state,
        listBurgerIngredients: {
          success: success,
          ingredients: ingredients,
        }

      };
    }

    default: return state;
  }
};
