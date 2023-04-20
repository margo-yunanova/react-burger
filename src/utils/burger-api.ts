import { BURGER_API_URL, wsUrl } from './constants';

export const getOrdersWsUrl = (isAllOrders: boolean): string =>
  isAllOrders
    ? `${wsUrl}/all`
    : `${wsUrl}?token=${localStorage.getItem('accessToken') ?? ''.slice(7)}`;

const checkResponse = (res: Response) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

const request = (endpoint: string, options?: RequestInit) => {
  const url = `${BURGER_API_URL}/${endpoint}`;
  const params = {
    ...options,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...options?.headers,
    },
  };
  return fetch(url, params).then(checkResponse);
};

type TUpdateTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

const updateTokenRequest = (token: string): Promise<TUpdateTokenResponse> =>
  request('auth/token', {
    method: 'POST',
    body: JSON.stringify({
      token: token,
    }),
  });

const requestWithToken = (endpoint: string, options?: RequestInit) => {
  const url = `${BURGER_API_URL}/${endpoint}`;
  const params = {
    ...options,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken') ?? '', //as string
      ...options?.headers,
    },
  };
  return fetch(url, params)
    .then((response) => {
      if (response.status !== 401 && response.status !== 403) {
        return response;
      }
      return updateTokenRequest(localStorage.getItem('refreshToken') ?? '') //as string
        .catch((error) => {
          //console.log(error, 'не удалось обновить токен');
          return Promise.reject(error);
        })
        .then((token) => {
          localStorage.setItem('refreshToken', token.refreshToken);
          localStorage.setItem('accessToken', token.accessToken);
          params.headers.authorization = token.accessToken;
          return fetch(url, params);
        });
    })
    .catch((error) => {
      //console.log(error);
      return Promise.reject(error);
    })
    .then(checkResponse);
};

type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
};
type TIngredientsResponse = {
  data: Array<TIngredient>;
  success: boolean;
};
export const getIngredientsRequest = (): Promise<TIngredientsResponse> =>
  request('ingredients');

type TMadeOrderResponse = {
  name: string,
  order: {
    createdAt: string;
    ingredients: Array<TIngredient>;
    name: string;
    number: number;
    owner: {
      createdAt: string;
      email: string;
      name: string;
      updatedAt: string;
    };
    price: number;
    status: string;
    updatedAt: string;
    _id: string;
  },
  success: boolean,
}
export const makeOrderDetailsRequest = (ingredientsId: string[]): Promise<TMadeOrderResponse> =>
  requestWithToken('orders', {
    method: 'POST',
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  });

type TRestorePasswordResponse = {
  success: boolean;
  message: string;
};

export const restorePasswordRequest = ({
  email,
}: {
  email: string;
}): Promise<TRestorePasswordResponse> =>
  request('password-reset', {
    method: 'POST',
    body: JSON.stringify({
      email: email,
    }),
  });

type TResetPasswordResponse = {
  success: boolean;
  message: string;
};

export const resetPasswordRequest = ({
  password,
  token,
}: {
  password: string;
  token: string;
}): Promise<TResetPasswordResponse> =>
  request(`password-reset/reset`, {
    method: 'POST',
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });

type TUser = {
  email: string;
  name: string;
};

type TCreatedUserResponse = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export const createUserRequest = ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<TCreatedUserResponse> =>
  request(`auth/register`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });

type TLoginUserResponse = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export const loginUserRequest = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<TLoginUserResponse> =>
  request(`auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

type TLogoutUserResponse = {
  success: boolean;
  message: string;
};

export const logoutUserRequest = (
  token: string,
): Promise<TLogoutUserResponse> =>
  request(`auth/logout`, {
    method: 'POST',
    body: JSON.stringify({
      token: token,
    }),
  });

type TUserResponse = {
  success: boolean;
  user: TUser;
};

export const getUserRequest = (): Promise<TUserResponse> =>
  requestWithToken(`auth/user`);

export const updateUserRequest = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<TUserResponse> =>
  requestWithToken(`auth/user`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });
