import {
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS
 } from "../actions/user";

const initialState = {
  success: false,
  user: {
    email: null,
    name: null,
  },
  accessToken: null,
  refreshToken: null,
  request: false,
}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        request: true,
      }
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        user: {
          email: null,
          name: null,
        },
        accessToken: null,
        refreshToken: null,
        request: false,
      }
    }

    case GET_USER_SUCCESS: {
      const { user, accessToken, refreshToken, success } = action.payload;
      return {
        ...state,
        success,
        user: {
          email: user.email,
          name: user.name,
        },
        accessToken,
        refreshToken,
        request: true,
      }
    }

    default: return state;
  }
}
