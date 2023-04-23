import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  legacy_createStore as createStore,
  applyMiddleware,
  ActionCreator,
  Action,
} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './components/app/app';
import { rootReducer } from './services/reducers';
import { BrowserRouter } from 'react-router-dom';
import {
  TWsConnectionActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from './services/actions/webSocket';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import { composeWithDevTools } from '@redux-devtools/extension';
import { TConstructorActions } from './services/actions/constructor';
import { TIngredientsActions } from './services/actions/ingredients';
import { TOrderDetailsActions } from './services/actions/orderDetails';
import { TUserActions } from './services/actions/user';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  wsStop: WS_CONNECTION_STOP,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const composeEnhancers = composeWithDevTools({});

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsActions)),
);

const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>
type TApplicationActions = TConstructorActions | TIngredientsActions | TOrderDetailsActions | TUserActions | TWsConnectionActions;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppDispatch = typeof store.dispatch;

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
