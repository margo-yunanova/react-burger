import {
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  AUTHORIZATION_USER_FAILED,
  AUTHORIZATION_USER_REQUEST,
  AUTHORIZATION_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
 } from "../actions/user";

const initialState = {
  success: false,
  user: null,
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
        request: false,
      }
    }

    case REGISTER_USER_SUCCESS: {
      const { user, success } = action.payload;
      return {
        ...state,
        success,
        user: {
          email: user.email,
          name: user.name,
        },
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
        request: false,
      }
    }

    case AUTHORIZATION_USER_SUCCESS: {
      const { user, success } = action.payload;
      return {
        ...state,
        success,
        user: {
          email: user.email,
          name: user.name,
        },
        request: false,
      }
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        request: true,
      }
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        user: null,
        request: false,
      }
    }

    case GET_USER_SUCCESS: {
      const { user, success } = action.payload;
      return {
        ...state,
        success,
        user: {
          email: user.email,
          name: user.name,
        },
        request: false,
      }
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        request: true,
      }
    }

    case UPDATE_USER_FAILED: {
      return {
        ...state,
        user: null,
        request: false,
      }
    }

    case UPDATE_USER_SUCCESS: {
      const { user, success } = action.payload;
      return {
        ...state,
        success,
        user: {
          email: user.email,
          name: user.name,
        },
        request: false,
      }
    }

    default: return state;
  }
}
