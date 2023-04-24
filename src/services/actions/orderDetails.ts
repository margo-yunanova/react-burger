import { AppDispatch, AppThunk } from '../..';
import { makeOrderDetailsRequest } from '../../utils/burger-api';
import { EMPTY_CONSTRUCTOR } from './constructor';

export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';
export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const SET_CHECKOUT_BUTTON_DISABLED = 'SET_CHECKOUT_BUTTON_DISABLED';
export const SET_CHECKOUT_BUTTON_ACTIVE = 'SET_CHECKOUT_BUTTON_ACTIVE';
export const SHOW_ORDER_MODAL = 'SHOW_ORDER_MODAL';
export const HIDE_ORDER_MODAL = 'HIDE_ORDER_MODAL';

type TGetOrderDetailsRequestAction = {
  readonly type: typeof GET_ORDER_DETAILS_REQUEST;
};

type TGetOrderDetailsSuccessAction = {
  readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
  readonly payload: {
    name: string;
    order: {
      number: number;
    };
    success: boolean;
  };
};

type TGetOrderDetailsFailedAction = {
  readonly type: typeof GET_ORDER_DETAILS_FAILED;
};

type TShowOrderModalAction = {
  readonly type: typeof SHOW_ORDER_MODAL;
};

type THideOrderModalAction = {
  readonly type: typeof HIDE_ORDER_MODAL;
};

type TSetCheckoutButtonActiveAction = {
  readonly type: typeof SET_CHECKOUT_BUTTON_ACTIVE;
};

type TSetCheckoutButtonDisabledAction = {
  readonly type: typeof SET_CHECKOUT_BUTTON_DISABLED;
};

export type TOrderDetailsActions =
  | TGetOrderDetailsFailedAction
  | TGetOrderDetailsRequestAction
  | TGetOrderDetailsSuccessAction
  | TSetCheckoutButtonActiveAction
  | TShowOrderModalAction
  | TSetCheckoutButtonDisabledAction
  | THideOrderModalAction;

export const getOrderDetails: AppThunk = (ingredientsId: Array<string>) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_ORDER_DETAILS_REQUEST,
      });
      const { name, order, success } = await makeOrderDetailsRequest(ingredientsId);
      dispatch({
        type: GET_ORDER_DETAILS_SUCCESS,
        payload: {
          name,
          order: {
            number: order.number,
          },
          success,
        },
      });
      dispatch({ type: SHOW_ORDER_MODAL });
      dispatch({ type: EMPTY_CONSTRUCTOR });
    } catch {
      dispatch({ type: GET_ORDER_DETAILS_FAILED });
    } finally {
      dispatch({ type: SET_CHECKOUT_BUTTON_ACTIVE });
    }
  };
};
