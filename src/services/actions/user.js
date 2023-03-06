import {
  createUserRequest,
  loginUserRequest
} from "../../utils/burger-api";

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const REGISTER_USER_REQUEST = 'V_USER_REQUEST';
export const AUTHORIZATION_USER_SUCCESS = 'AUTHORIZATION_USER_SUCCESS';
export const AUTHORIZATION_USER_FAILED = 'AUTHORIZATION_USER_FAILED';
export const AUTHORIZATION_USER_REQUEST = 'AUTHORIZATION_USER_REQUEST';
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
          'accessToken': response.accessToken,
          'refreshToken': response.refreshToken,
        }
      });
    })
      .catch(error => {
        console.log(error);
        dispatch({ type: REGISTER_USER_FAILED });
      })
      .finally(() => dispatch({ type: SET_REGISTER_BUTTON_ACTIVE }));
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
          'accessToken': response.accessToken,
        }
      });
      document.cookie = encodeURIComponent('refreshToken') + '=' + encodeURIComponent(response.refreshToken.toString());
    })
      .catch(error => {
        console.log(error);
        dispatch({ type: AUTHORIZATION_USER_FAILED });
      })
      .finally(() => dispatch({ type: SET_REGISTER_BUTTON_ACTIVE })); //TODO кнопки
  };
};
