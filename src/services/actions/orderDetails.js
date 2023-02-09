import { makeOrderDetailsRequest } from "../../utils/burger-api";

export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';
export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const SET_CHECKOUT_BUTTON_DISABLED = 'SET_CHECKOUT_BUTTON_DISABLED';
export const SET_CHECKOUT_BUTTON_ACTIVE = 'SET_CHECKOUT_BUTTON_ACTIVE';
export const SHOW_ORDER_MODAL = 'SHOW_ORDER_MODAL';
export const HIDE_ORDER_MODAL = 'HIDE_ORDER_MODAL';

export const getOrderDetails = (ingredientsId) => {
  return (dispatch) => {
    dispatch({
      type: GET_ORDER_DETAILS_REQUEST,
    });
    makeOrderDetailsRequest(ingredientsId).then(response => {
      dispatch({
        type: GET_ORDER_DETAILS_SUCCESS,
        payload: {
          name: response.name,
          order: {
            number: response.order.number,
          },
          success: response.success,
        }
      });
      dispatch({ type: SHOW_ORDER_MODAL });
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: GET_ORDER_DETAILS_FAILED});
    })
    .finally(() => dispatch({ type: SET_CHECKOUT_BUTTON_ACTIVE}))
  }
}
