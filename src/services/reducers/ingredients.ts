import { TIngredient } from '../../utils/types';
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../actions/ingredients';
import type { TGetIngredients } from '../actions/ingredients';

type TInitialStateIngredients = {
  listBurgerIngredients: {
    success: boolean;
    ingredients: Array<TIngredient>;
  };
};

const initialState: TInitialStateIngredients = {
  listBurgerIngredients: {
    success: false,
    ingredients: [],
  },
};

export const ingredients = (
  state = initialState,
  action: TGetIngredients,
): TInitialStateIngredients => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return state;
    }
    case GET_INGREDIENTS_FAILED: {
      return initialState;
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
