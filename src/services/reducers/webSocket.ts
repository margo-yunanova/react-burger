import { TMadeOrder } from '../../utils/types';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_STOP,
  TWsConnectionActions,
} from '../actions/webSocket';

type TWsConnectionState = {
  wsConnected: boolean;
  messages: {
    success: boolean;
    totalOrdersAllTime: number | null;
    totalOrdersToday: number | null;
    orders: Array<TMadeOrder> | null;
  };
};

const initialState: TWsConnectionState = {
  wsConnected: false,
  messages: {
    success: false,
    totalOrdersAllTime: null,
    totalOrdersToday: null,
    orders: null,
  },
};

export const wsReducer = (
  state = initialState,
  action: TWsConnectionActions,
): TWsConnectionState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_STOP: {
      return initialState;
    }

    case WS_GET_MESSAGE:
      const { success, total, totalToday, orders } = action.payload;
      return {
        ...state,
        messages: {
          success,
          totalOrdersAllTime: total,
          totalOrdersToday: totalToday,
          orders,
        },
      };

    default:
      return state;
  }
};
