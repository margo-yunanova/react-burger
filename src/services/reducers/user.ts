import { TPayloadUser } from '../../utils/types';
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
  LOGOUT_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  TUserActions,
} from '../actions/user';

type TUserState = {
  success: boolean;
  user: { email: string; name: string } | null;
  request: boolean;
  isLogout: boolean;
};

const initialState: TUserState = {
  success: false,
  user: null,
  request: false,
  isLogout: false,
};

export const user = (
  state = initialState,
  action: TUserActions,
): TUserState => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        success: false,
        request: true,
        isLogout: false,
      };
    }

    case REGISTER_USER_FAILED: {
      return initialState;
    }

    case REGISTER_USER_SUCCESS: {
      const { user, success } = action.payload as TPayloadUser;
      return {
        ...state,
        success,
        user: {
          email: user.email,
          name: user.name,
        },
        request: false,
        isLogout: false,
      };
    }

    case AUTHORIZATION_USER_REQUEST: {
      return {
        ...state,
        success: false,
        request: true,
        isLogout: false,
      };
    }

    case AUTHORIZATION_USER_FAILED: {
      return initialState;
    }

    case AUTHORIZATION_USER_SUCCESS: {
      const { user, success } = action.payload as TPayloadUser;
      return {
        ...state,
        success,
        user: {
          email: user.email,
          name: user.name,
        },
        request: false,
        isLogout: false,
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        success: false,
        request: true,
        isLogout: false,
      };
    }

    case GET_USER_FAILED: {
      return initialState;
    }

    case GET_USER_SUCCESS: {
      const { user, success } = action.payload as TPayloadUser;
      return {
        ...state,
        success,
        user: {
          email: user.email,
          name: user.name,
        },
        request: false,
        isLogout: false,
      };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        success: false,
        request: true,
        isLogout: false,
      };
    }

    case UPDATE_USER_FAILED: {
      return initialState;
    }

    case UPDATE_USER_SUCCESS: {
      const { user, success } = action.payload as TPayloadUser;
      return {
        ...state,
        success,
        user: {
          email: user.email,
          name: user.name,
        },
        request: false,
        isLogout: false,
      };
    }

    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        success: false,
        request: true,
        isLogout: false,
      };
    }

    case LOGOUT_USER_FAILED: {
      return state;
    }

    case LOGOUT_USER_SUCCESS: {
      const { success } = action.payload as {success: boolean};
      return {
        ...state,
        success,
        user: null,
        request: false,
        isLogout: true,
      };
    }

    default:
      return state;
  }
};
