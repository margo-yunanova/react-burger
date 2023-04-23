import { TIngredient } from '../../utils/types';
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../actions/ingredients';
import type { TIngredientsActions } from '../actions/ingredients';

export type TIngredientsState = {
  success: boolean;
    ingredients: Array<TIngredient>;
};

const initialState: TIngredientsState = {
  success: false,
  ingredients: [],
};

export const ingredients = (
  state = initialState,
  action: TIngredientsActions,
): TIngredientsState => {
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
        success: success,
        ingredients: ingredients,
      };
    }

    default:
      return state;
  }
};
