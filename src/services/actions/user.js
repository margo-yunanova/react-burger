import { createUserRequest } from "../../utils/burger-api";

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const SET_REGISTER_BUTTON_DISABLED = 'SET_REGISTER_BUTTON_DISABLED';
export const SET_REGISTER_BUTTON_ACTIVE = 'SET_REGISTER_BUTTON_ACTIVE';

export const registerUser = (email, password, name) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST,
    });
    console.log(email)
    createUserRequest(email, password, name).then(response => {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: {
          'success': response.success,
          'user': {
            'email': response.user.email,
            'name': response.user.email,
          },
          'accessToken': response.accessToken,
          'refreshToken': response.refreshToken,
        }
      });
    })
      .catch(error => {
        console.log(error);
        dispatch({ type: GET_USER_FAILED });
      })
      .finally(() => dispatch({ type: SET_REGISTER_BUTTON_ACTIVE }));
  };
}
