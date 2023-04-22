import { AppDispatch, AppThunk } from '../..';
import { getIngredientsRequest } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';

export type TGetIngredientsRequestAction = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export type TGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: {
    success: boolean;
    ingredients: Array<TIngredient>;
  };
};

export type TGetIngredientsFailedAction = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

export type TIngredientsActions =
  | TGetIngredientsFailedAction
  | TGetIngredientsRequestAction
  | TGetIngredientsSuccessAction;

export const getIngredients: AppThunk = () => {
  return (dispatch: AppDispatch) => {
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
