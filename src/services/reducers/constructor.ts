import { TIngredient } from '../../utils/types';
import {
  ADD_INGREDIENT_INTO_CONSTRUCTOR,
  EMPTY_CONSTRUCTOR,
  MOVE_INGREDIENT_IN_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  TConstructorActions,
} from '../actions/constructor';

export type TOrderIngredientsState = {
  bun: TIngredient | null;
  bunFilling: Array<TIngredient & { code: string; }>
}

const initialState: TOrderIngredientsState = {
  bun: null,
  bunFilling: [],
};

export const orderIngredients = (state = initialState, action: TConstructorActions): TOrderIngredientsState => {
  switch (action.type) {
    case ADD_INGREDIENT_INTO_CONSTRUCTOR: {
      const { ingredient, code } = action.payload;
      if (ingredient.type === 'bun') {
        return {
          ...state,
          bun: ingredient,
        };
      } else {
        return {
          ...state,
          bunFilling: [...state.bunFilling, { ...ingredient, code: code }],
        };
      }
    }
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      const { ingredient } = action.payload;
      return {
        ...state,
        bunFilling: state.bunFilling.filter(
          (item) => item.code !== ingredient.code,
        ),
      };
    }

    case MOVE_INGREDIENT_IN_CONSTRUCTOR: {
      const { dragIndex, hoverIndex } = action.payload;
      const newBunFilling = [...state.bunFilling];
      const ingredient = newBunFilling[dragIndex];
      newBunFilling[dragIndex] = newBunFilling[hoverIndex];
      newBunFilling[hoverIndex] = ingredient;
      return {
        ...state,
        bunFilling: newBunFilling,
      };
    }

    case EMPTY_CONSTRUCTOR: {
      return initialState;
    }

    default:
      return state;
  }
};
