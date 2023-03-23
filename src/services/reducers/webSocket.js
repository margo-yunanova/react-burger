import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_STOP
} from '../actions/webSocket';

const initialState = {
  wsConnected: false,
  messages: {
    success: false,
    totalOrdersAllTime: null,
    totalOrdersToday: null,
    orders: null,
  }
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_STOP: {
      return {
        ...state,
        wsConnected: false,
        messages: {
          success: false,
          orders: null,
        },
      }
    }

    case WS_GET_MESSAGE:
      const {success, total, totalToday, orders} = action.payload
      return {
        ...state,
        messages: {
        success,
        totalOrdersAllTime: total,
        totalOrdersToday: totalToday,
        orders,
      }};

    default:
      return state;
  }
};
