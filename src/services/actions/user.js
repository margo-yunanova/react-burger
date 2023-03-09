import {
  createUserRequest,
  loginUserRequest,
  getUserRequest,
  updateUserRequest,
  updateTokenRequest,
  logoutUserRequest,
} from "../../utils/burger-api";
import { localStorage } from "../../utils/constants";

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

export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';

export const SET_REGISTER_BUTTON_DISABLED = 'SET_REGISTER_BUTTON_DISABLED';
export const SET_REGISTER_BUTTON_ACTIVE = 'SET_REGISTER_BUTTON_ACTIVE';

export const registerUser = (form) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    createUserRequest(form).then(response => {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          'success': response.success,
          'user': {
            'email': response.user.email,
            'name': response.user.name,
          },
        }
      });
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('accessToken', response.accessToken);
    })
      .catch(error => {
        console.log(error);
        dispatch({ type: REGISTER_USER_FAILED });
      })
      .finally(() => dispatch({ type: SET_REGISTER_BUTTON_ACTIVE }));//TODO кнопки
  };
};

export const authorizeUser = (form) => {
  return (dispatch) => {
    dispatch({
      type: AUTHORIZATION_USER_REQUEST,
    });
    loginUserRequest(form).then(response => {
      dispatch({
        type: AUTHORIZATION_USER_SUCCESS,
        payload: {
          'success': response.success,
          'user': {
            'email': response.user.email,
            'name': response.user.name,
          },
        }
      });
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('accessToken', response.accessToken);
    })
      .catch(error => {
        console.log(error);
        dispatch({ type: AUTHORIZATION_USER_FAILED });
      })
      .finally(() => dispatch({ type: SET_REGISTER_BUTTON_ACTIVE })); //TODO кнопки
  };
};

export const getUser = (accessToken) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUserRequest(accessToken).then(response => {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: {
          'success': response.success,
          'user': {
            'email': response.user.email,
            'name': response.user.name,
          },
        }
      });
    })
      .catch(error => {
        console.log(error);
        dispatch({ type: GET_USER_FAILED });
      })
      .finally(() => dispatch({ type: SET_REGISTER_BUTTON_ACTIVE })); //TODO кнопки
  };
};

export const updateUser = (form, accessToken) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    updateUserRequest(form, accessToken).then(response => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          'success': response.success,
          'user': {
            'email': response.user.email,
            'name': response.user.name,
          },
        }
      });
    })
      .catch(error => {
        console.log(error);
        dispatch({ type: UPDATE_USER_FAILED });
      })
      .finally(() => dispatch({ type: SET_REGISTER_BUTTON_ACTIVE })); //TODO кнопки
  };
};

export const updateToken = (refreshToken) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_TOKEN_REQUEST,
    });
    updateTokenRequest(refreshToken).then(response => {
      dispatch({
        type: UPDATE_TOKEN_SUCCESS,
        payload: {
          'success': response.success,
          },
        }
      );
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('accessToken', response.accessToken);
    })
      .catch(error => {
        console.log(error);
        dispatch({ type: UPDATE_TOKEN_FAILED });
      })
      .finally(() => {}); //TODO кнопки, finally
  };
};

export const logoutUser = (refreshToken) => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    logoutUserRequest(refreshToken).then(response => {
      dispatch({
        type: LOGOUT_USER_SUCCESS,
        payload: {
          'success': response.success, //TODO message - нужно ли сохранять
        }
      })
      localStorage.removeItem('accessToken');
    })
      .catch(error => {
        console.log(error);
        dispatch({ type: LOGOUT_USER_FAILED });
      })
      .finally(() => dispatch({ type: SET_REGISTER_BUTTON_ACTIVE })); //TODO кнопки
  };
};
