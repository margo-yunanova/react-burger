import {
  ADD_INGREDIENT_INTO_CONSTRUCTOR,
  MOVE_INGREDIENT_IN_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SPLICE_INGREDIENT_IN_CONSTRUCTOR } from "../actions/constructor";

const initialState = {
  bun: null,
  bunFilling: [],
};

export const orderIngredients = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_INTO_CONSTRUCTOR: {
      const { item, code } = action.payload;
      if (item.type === 'bun') {
        return {
          ...state,
          bun: item,
        };
      }
      else {
        return {
          ...state,
          bunFilling: [...state.bunFilling, { ...item, code }]
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

    case SPLICE_INGREDIENT_IN_CONSTRUCTOR: {
      const { item, index, isFirstHalfIngredient } = action.payload;
      const newBunFilling = [...state.bunFilling]
      newBunFilling.splice(isFirstHalfIngredient ? index : index + 1, 0, item) ;
      return {
        ...state,
        bunFilling: newBunFilling,
      }
    }

    default: return state;
  }
};
