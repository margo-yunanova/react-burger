import { ADD_INGREDIENT_INTO_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from "../actions/constructor";

const initialState = {
  bun: null,
  bunFilling: [],
};

export const draggedIngredients = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_INTO_CONSTRUCTOR: {
      const { ingredient, code } = action.payload;
      if (ingredient.type === 'bun') {
        return {
          ...state,
          bun: ingredient,
        }
      }
      else {
        return {
          ...state,
          bunFilling: [...state.bunFilling, {...ingredient, code: code}]
        }
      }
    }
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      const { ingredient } = action.payload;
      return {
        ...state,
        bunFilling: state.bunFilling.filter((item) => item.code !== ingredient.code)
      }
    }



    default: return state;
  }
};
