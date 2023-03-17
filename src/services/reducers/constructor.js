import { ADD_INGREDIENT_INTO_CONSTRUCTOR, EMPTY_CONSTRUCTOR, MOVE_INGREDIENT_IN_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from "../actions/constructor";

const initialState = {
  bun: null,
  bunFilling: [],
};

export const orderIngredients = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_INTO_CONSTRUCTOR: {
      const { ingredient, code } = action.payload;
      if (ingredient.type === 'bun') {
        return {
          ...state,
          bun: ingredient,
        };
      }
      else {
        return {
          ...state,
          bunFilling: [...state.bunFilling, { ...ingredient, code: code }]
        };
      }
    }
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      const { ingredient } = action.payload;
      return {
        ...state,
        bunFilling: state.bunFilling.filter((item) => item.code !== ingredient.code)
      };
    }

    case MOVE_INGREDIENT_IN_CONSTRUCTOR: {
      const { dragIndex, hoverIndex, } = action.payload;
      const newBunFilling = [...state.bunFilling];
      const ingredient = newBunFilling[dragIndex];
      newBunFilling[dragIndex] = newBunFilling[hoverIndex];
      newBunFilling[hoverIndex] = ingredient;
      return {
        ...state,
        bunFilling: newBunFilling
      };
    }

    case EMPTY_CONSTRUCTOR: {
      return {
        bun: null,
        bunFilling: [],
      };
    }

    default: return state;
  }
};
