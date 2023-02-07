import {
  GET_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_SUCCESS,
  SHOW_ORDER_MODAL,
  HIDE_ORDER_MODAL,
  SET_CHECKOUT_BUTTON_ACTIVE,
  SET_CHECKOUT_BUTTON_DISABLED,
 } from "../actions/orderDetails";


const initialState = {
  name: null,
  order: {
    number: null,
  },
  success: true,
  buttonDisabled: false,
  orderDetailVisible: false,
};

export const orderDetails = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_FAILED: {
      return state;
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      const { order: { number} } = action.payload;
      return {
        ...state,
        order: {
          number: number,
        },
      }
    }
    case SHOW_ORDER_MODAL: {
      return {
        ...state,
        orderDetailVisible: true,
      }
    }
    case HIDE_ORDER_MODAL: {
      return {
        ...state,
        orderDetailVisible: false,
      }
    }
    case SET_CHECKOUT_BUTTON_ACTIVE: {
      return {
        ...state,
        buttonDisabled: false,
      }
    }
    case SET_CHECKOUT_BUTTON_DISABLED: {
      return {
        ...state,
        buttonDisabled: true,
      }
    }

    default: return state;
  }
}
