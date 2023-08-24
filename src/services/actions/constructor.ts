import { TIngredient } from "../../utils/types";

export const ADD_INGREDIENT_INTO_CONSTRUCTOR =
  'ADD_INGREDIENT_INTO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR =
  'REMOVES_INGREDIENT_FROM_CONSTRUCTOR';
export const MOVE_INGREDIENT_IN_CONSTRUCTOR = 'MOVE_INGREDIENT_IN_CONSTRUCTOR';
export const EMPTY_CONSTRUCTOR = 'EMPTY_CONSTRUCTOR';

type TAddIngredientIntoConstructorAction = {
  readonly type: typeof ADD_INGREDIENT_INTO_CONSTRUCTOR;
  readonly payload: {
    ingredient: TIngredient;
    code: string;
  }
};

type TRemoveIngredientFromConstructorAction = {
  readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly payload: {
    ingredient: TIngredient & { code: string; };
  }
};

type TMoveIngredientInConstructorAction = {
  readonly type: typeof MOVE_INGREDIENT_IN_CONSTRUCTOR;
  readonly payload: {
    dragIndex: number;
    hoverIndex: number;
  };
};

type TEmptyConstructorAction = {
  readonly type: typeof EMPTY_CONSTRUCTOR;
};

export type TConstructorActions =
  | TAddIngredientIntoConstructorAction
  | TRemoveIngredientFromConstructorAction
  | TMoveIngredientInConstructorAction
  | TEmptyConstructorAction;
