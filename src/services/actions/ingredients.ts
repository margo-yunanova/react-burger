import { getIngredientsRequest } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';

export type TGetIngredientsRequest = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export type TGetIngredientsSuccess = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: {
    success: boolean;
    ingredients: Array<TIngredient>;
  };
};

export type TGetIngredientsFailed = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

export type TGetIngredients =
  | TGetIngredientsFailed
  | TGetIngredientsRequest
  | TGetIngredientsSuccess;

export const getIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredientsRequest()
      .then((response) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: {
            success: response.success,
            ingredients: response.data,
          },
        });
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
};
