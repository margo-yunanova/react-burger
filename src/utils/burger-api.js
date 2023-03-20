import { BURGER_API_URL } from './constants';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

const request = (endpoint, options) => {
  const url = `${BURGER_API_URL}/${endpoint}`;
  const params = {
    ...options,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...options?.headers,
    }
  };
  return fetch(url, params).then(checkResponse);
};

const updateTokenRequest = (token) => request('auth/token', {
  method: 'POST',
  body: JSON.stringify({
    'token': token,
  })
});

const requestWithToken = (endpoint, options) => {
  const url = `${BURGER_API_URL}/${endpoint}`;
  const params = {
    ...options,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem("accessToken"),
      ...options?.headers,
    },
  };
  return fetch(url, params)
    .then((response) => {
      if (response.status !== 401 && response.status !== 403) {
        return response;
      }
      return updateTokenRequest(localStorage.getItem('refreshToken'))
        .catch(error => {
          //console.log(error, 'не удалось обновить токен');
          return Promise.reject(error);
        })
        .then(token => {
          localStorage.setItem('refreshToken', token.refreshToken);
          localStorage.setItem('accessToken', token.accessToken);
          params.headers.authorization = token.accessToken;
          return fetch(url, params);
        });
    })
    .catch(error => {
      //console.log(error);
      return Promise.reject(error);
    })
    .then(checkResponse);
};

export const getIngredientsRequest = () => request('ingredients');

export const makeOrderDetailsRequest = (ingredientsId) => requestWithToken('orders', {
  method: 'POST',
  body: JSON.stringify({
    'ingredients': ingredientsId,
  })
});

export const restorePasswordRequest = ({ email }) => request('password-reset', {
  method: 'POST',
  body: JSON.stringify({
    'email': email,
  })
});

export const resetPasswordRequest = ({ password, token }) => request(`password-reset/reset`, {
  method: 'POST',
  body: JSON.stringify({
    'password': password,
    'token': token,
  })
});

export const createUserRequest = ({ email, password, name }) => request(`auth/register`, {
  method: 'POST',
  body: JSON.stringify({
    'email': email,
    'password': password,
    'name': name,
  })
});

export const loginUserRequest = ({ email, password }) => request(`auth/login`, {
  method: 'POST',
  body: JSON.stringify({
    'email': email,
    'password': password,
  })
});

export const logoutUserRequest = (token) => request(`auth/logout`, {
  method: 'POST',
  body: JSON.stringify({
    'token': token,
  })
});

export const getUserRequest = () => requestWithToken(`auth/user`);

export const updateUserRequest = ({ name, email, password }) => requestWithToken(`auth/user`, {
  method: 'PATCH',
  body: JSON.stringify({
    'name': name,
    'email': email,
    'password': password,
  })
});
