import { ADD_INGREDIENT_INTO_CONSTRUCTOR } from "../actions/constructor";

const initialState = {
  bun: null,
  bunFilling: [],
};

export const draggedIngredients = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_INTO_CONSTRUCTOR: {
      const { ingredient } = action.payload;
      if (ingredient.type === 'bun') {
        return {
          ...state,
          bun: ingredient,
        }
      }
      else {
        return {
          ...state,
          bunFilling: [...state.bunFilling, ingredient]
        }
      }
    }



    default: return state;
  }
};
