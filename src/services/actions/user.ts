import { AppDispatch, AppThunk } from '../..';
import {
  createUserRequest,
  loginUserRequest,
  getUserRequest,
  updateUserRequest,
  logoutUserRequest,
} from '../../utils/burger-api';
import { localStorage } from '../../utils/constants';
import { TAction, TPayloadUser } from '../../utils/types';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const AUTHORIZATION_USER_SUCCESS = 'AUTHORIZATION_USER_SUCCESS';
export const AUTHORIZATION_USER_FAILED = 'AUTHORIZATION_USER_FAILED';
export const AUTHORIZATION_USER_REQUEST = 'AUTHORIZATION_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';

export const SET_REGISTER_BUTTON_ACTIVE = 'SET_REGISTER_BUTTON_ACTIVE';

type TRegisterForm = {
  name: string;
  email: string;
  password: string;
};

type TRegisterUserRequestAction = TAction<typeof REGISTER_USER_REQUEST>;

type TRegisterUserSuccessAction = TAction<
  typeof REGISTER_USER_SUCCESS,
  TPayloadUser
>;

type TRegisterUserFailedAction = TAction<typeof REGISTER_USER_FAILED>;

type TSetRegisterButtonActiveAction = TAction<
  typeof SET_REGISTER_BUTTON_ACTIVE
>;

export const registerUser: AppThunk = (form: TRegisterForm) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_USER_REQUEST,
      });
      const { success, user, refreshToken, accessToken } =
        await createUserRequest(form);
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          success,
          user: {
            email: user.email,
            name: user.name,
          },
        },
      });
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken);
    } catch {
      dispatch({ type: REGISTER_USER_FAILED });
    } finally {
      dispatch({ type: SET_REGISTER_BUTTON_ACTIVE }); //TODO кнопки
    }
  };
};

type TAuthorizeForm = {
  email: string;
  password: string;
};

type TAuthorizeUserRequestAction = TAction<typeof AUTHORIZATION_USER_REQUEST>;

type TAuthorizeUserSuccessAction = TAction<
  typeof AUTHORIZATION_USER_SUCCESS,
  TPayloadUser
>;

type TAuthorizeUserFailedAction = TAction<typeof AUTHORIZATION_USER_FAILED>;

export const authorizeUser: AppThunk = (form: TAuthorizeForm) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: AUTHORIZATION_USER_REQUEST,
      });
      const { success, user, refreshToken, accessToken } =
        await loginUserRequest(form);
      dispatch({
        type: AUTHORIZATION_USER_SUCCESS,
        payload: {
          success,
          user: {
            email: user.email,
            name: user.name,
          },
        },
      });
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken);
    } catch {
      dispatch({ type: AUTHORIZATION_USER_FAILED });
    } finally {
      dispatch({ type: SET_REGISTER_BUTTON_ACTIVE }); //TODO кнопки
    }
  };
};

type TGetUserRequestAction = TAction<typeof GET_USER_REQUEST>;

type TGetUserSuccessAction = TAction<typeof GET_USER_SUCCESS, TPayloadUser>;

type TGetUserFailedAction = TAction<typeof GET_USER_FAILED>;

export const getUser: AppThunk = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_USER_REQUEST,
      });
      const { success, user } = await getUserRequest();
      dispatch({
        type: 'GET_USER_SUCCESS',
        payload: {
          success,
          user: {
            email: user.email,
            name: user.name,
          },
        },
      });
    } catch {
      dispatch({ type: GET_USER_FAILED });
    } finally {
      dispatch({ type: SET_REGISTER_BUTTON_ACTIVE }); //TODO кнопки
    }
  };
};

type TUpdateForm = {
  email: string;
  name: string;
  password: string;
};

type TUpdateUserRequestAction = TAction<typeof UPDATE_USER_REQUEST>;

type TUpdateUserSuccessAction = TAction<
  typeof UPDATE_USER_SUCCESS,
  TPayloadUser
>;

type TUpdateUserFailedAction = TAction<typeof UPDATE_USER_FAILED>;

export const updateUser: AppThunk = (form: TUpdateForm) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: UPDATE_USER_REQUEST,
      });
      const { success, user } = await updateUserRequest(form);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          success,
          user: {
            email: user.email,
            name: user.name,
          },
        },
      });
    } catch {
      dispatch({ type: UPDATE_USER_FAILED });
    } finally {
      dispatch({ type: SET_REGISTER_BUTTON_ACTIVE }); //TODO кнопки
    }
  };
};

type TLogoutUserRequestAction = TAction<typeof LOGOUT_USER_REQUEST>;

type TLogoutUserSuccessAction = TAction<
  typeof LOGOUT_USER_SUCCESS,
  { success: boolean }
>;

type TLogoutUserFailedAction = TAction<typeof LOGOUT_USER_FAILED>;

export const logoutUser: AppThunk = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGOUT_USER_REQUEST,
      });
      const { success } = await logoutUserRequest(
        localStorage.getItem('refreshToken') as string,
      );
      dispatch({
        type: LOGOUT_USER_SUCCESS,
        payload: {
          success, //TODO message - нужно ли сохранять
        },
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch {
      dispatch({ type: LOGOUT_USER_FAILED });
    } finally {
      dispatch({ type: SET_REGISTER_BUTTON_ACTIVE }); //TODO кнопки
    }
  };
};

export type TUserActions =
  | TRegisterUserRequestAction
  | TRegisterUserSuccessAction
  | TRegisterUserFailedAction
  | TSetRegisterButtonActiveAction
  | TAuthorizeUserFailedAction
  | TAuthorizeUserRequestAction
  | TAuthorizeUserSuccessAction
  | TGetUserFailedAction
  | TGetUserRequestAction
  | TGetUserSuccessAction
  | TUpdateUserFailedAction
  | TUpdateUserRequestAction
  | TUpdateUserSuccessAction
  | TLogoutUserFailedAction
  | TLogoutUserRequestAction
  | TLogoutUserSuccessAction;
