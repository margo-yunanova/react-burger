import { TMadeOrder } from "../../utils/types";

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_STOP = 'WS_CONNECTION_STOP';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

type TWsConnectionStartAction = {
  readonly type: typeof WS_CONNECTION_START;
};

type TWsConnectionStopAction = {
  readonly type: typeof WS_CONNECTION_STOP;
};

type TWsConnectionSuccessAction = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
};

type TWsConnectionErrorAction = {
  readonly type: typeof WS_CONNECTION_ERROR;
};

type TWsConnectionClosedAction = {
  readonly type: typeof WS_CONNECTION_CLOSED;
};

type TWsGetMessageAction = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: {
    success: boolean;
    total: number;
    totalToday: number;
    orders: Array<TMadeOrder>;
  }
};

type TWsSendMessageAction = {
  readonly type: typeof WS_SEND_MESSAGE;
};

export type TWsConnectionActions =
  | TWsConnectionStartAction
  | TWsConnectionClosedAction
  | TWsConnectionErrorAction
  | TWsConnectionStopAction
  | TWsGetMessageAction
  | TWsSendMessageAction
  | TWsConnectionSuccessAction;
