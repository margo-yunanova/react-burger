import {
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  AUTHORIZATION_USER_FAILED,
  AUTHORIZATION_USER_REQUEST,
  AUTHORIZATION_USER_SUCCESS,
 } from "../actions/user";

const initialState = {
  success: false,
  user: null,
  accessToken: null,
  request: false,
}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        request: true,
      }
    }

    case REGISTER_USER_FAILED: {
      return {
        ...state,
        user: null,
        accessToken: null,
        request: false,
      }
    }

    case REGISTER_USER_SUCCESS: {
      const { user, accessToken, success } = action.payload;
      return {
        ...state,
        success,
        user: {
          email: user.email,
          name: user.name,
        },
        accessToken,
        request: false,
      }
    }

    case AUTHORIZATION_USER_REQUEST: {
      return {
        ...state,
        request: true,
      }
    }

    case AUTHORIZATION_USER_FAILED: {
      return {
        ...state,
        user: null,
        accessToken: null,
        request: false,
      }
    }

    case AUTHORIZATION_USER_SUCCESS: {
      const { user, accessToken, success } = action.payload;
      return {
        ...state,
        success,
        user: {
          email: user.email,
          name: user.name,
        },
        accessToken,
        request: false,
      }
    }

    default: return state;
  }
}
