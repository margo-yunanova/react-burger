import {
  GET_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_SUCCESS,
  SHOW_ORDER_MODAL,
  HIDE_ORDER_MODAL,
  GET_ORDER_DETAILS_REQUEST,
} from '../actions/orderDetails';

const initialState = {
  name: null,
  order: {
    number: null,
  },
  success: true,
  request: false,
  orderDetailVisible: false,
};

export const orderDetails = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case GET_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        order: {
          number: null,
        },
        orderDetailVisible: false,
        request: false,
      };
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      const {
        order: { number },
      } = action.payload;
      return {
        ...state,
        order: {
          number: number,
        },
        request: false,
        orderDetailsSuccess: true,
      };
    }
    case SHOW_ORDER_MODAL: {
      return {
        ...state,
        orderDetailVisible: true,
      };
    }
    case HIDE_ORDER_MODAL: {
      return {
        ...state,
        orderDetailVisible: false,
      };
    }

    default:
      return state;
  }
};
