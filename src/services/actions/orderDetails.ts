import { makeOrderDetailsRequest } from '../../utils/burger-api';
import { EMPTY_CONSTRUCTOR } from './constructor';

export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';
export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const SET_CHECKOUT_BUTTON_DISABLED = 'SET_CHECKOUT_BUTTON_DISABLED';
export const SET_CHECKOUT_BUTTON_ACTIVE = 'SET_CHECKOUT_BUTTON_ACTIVE';
export const SHOW_ORDER_MODAL = 'SHOW_ORDER_MODAL';
export const HIDE_ORDER_MODAL = 'HIDE_ORDER_MODAL';

type TGetOrderDetailsRequest = {
  readonly type: typeof GET_ORDER_DETAILS_REQUEST;
};

type TGetOrderDetailsSuccess = {
  readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
  readonly payload: {
    name: string;
    order: {
      number: number;
    };
    success: boolean;
  };
};

type TGetOrderDetailsFailed = {
  readonly type: typeof GET_ORDER_DETAILS_FAILED;
};

type TShowOrderModal = {
  readonly type: typeof SHOW_ORDER_MODAL;
};

type TEmptyConstructor = {
  readonly type: typeof EMPTY_CONSTRUCTOR;
};

type TSetCheckoutButtonActive = {
  readonly type: typeof SET_CHECKOUT_BUTTON_ACTIVE;
};

export type TGetOrderDetails =
  | TEmptyConstructor
  | TGetOrderDetailsFailed
  | TGetOrderDetailsRequest
  | TGetOrderDetailsSuccess
  | TSetCheckoutButtonActive
  | TShowOrderModal;

export const getOrderDetails = (ingredientsId: Array<string>) => {
  return (dispatch) => {
    dispatch({
      type: GET_ORDER_DETAILS_REQUEST,
    });
    makeOrderDetailsRequest(ingredientsId)
      .then((response) => {
        dispatch({
          type: GET_ORDER_DETAILS_SUCCESS,
          payload: {
            name: response.name,
            order: {
              number: response.order.number,
            },
            success: response.success,
          },
        });
        dispatch({ type: SHOW_ORDER_MODAL });
        dispatch({ type: EMPTY_CONSTRUCTOR });
      })
      .catch(() => {
        dispatch({ type: GET_ORDER_DETAILS_FAILED });
      })
      .finally(() => dispatch({ type: SET_CHECKOUT_BUTTON_ACTIVE }));
  };
};
