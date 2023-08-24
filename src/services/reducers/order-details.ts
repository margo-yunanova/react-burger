import {
  GET_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_SUCCESS,
  SHOW_ORDER_MODAL,
  HIDE_ORDER_MODAL,
  GET_ORDER_DETAILS_REQUEST,
  TOrderDetailsActions,
} from '../actions/orderDetails';

type TOrderDetailsState = {
  name: string | null;
  order: {
    number: number | null;
  };
  success: boolean;
  request: boolean;
  orderDetailVisible: boolean;
};

const initialState: TOrderDetailsState = {
  name: null,
  order: {
    number: null,
  },
  success: true,
  request: false,
  orderDetailVisible: false,
};

export const orderDetails = (
  state = initialState,
  action: TOrderDetailsActions,
): TOrderDetailsState => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case GET_ORDER_DETAILS_FAILED: {
      return initialState;
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
        orderDetailVisible: true,
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
