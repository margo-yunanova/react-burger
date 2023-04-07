import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../actions/ingredients';

const initialState = {
  listBurgerIngredients: {
    success: null,
    ingredients: [],
  },
};

export const ingredients = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        listBurgerIngredients: [],
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      const { success, ingredients } = action.payload;
      return {
        ...state,
        listBurgerIngredients: {
          success: success,
          ingredients: ingredients,
        },
      };
    }

    default:
      return state;
  }
};
