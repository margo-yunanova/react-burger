import { BURGER_API_URL } from './constants';

export const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const updateTokenRequest = (token) => fetch(`${BURGER_API_URL}/auth/token`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({
    'token': token,
  })
})
.then(checkResponse);

export const fetchWithToken = (url, param) => {
  param = { ...param, headers: { ...param.headers, authorization: localStorage.getItem("accessToken") }, };
  return fetch(url, param)
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
          param.headers.authorization = token.accessToken;
          return fetch(url, param);
        });
    })
    .catch(error => {
      //console.log(error);
      return Promise.reject(error);
  });
};

export const getIngredientsRequest = () => fetch(`${BURGER_API_URL}/ingredients`)
  .then(checkResponse);

export const makeOrderDetailsRequest = (ingredientsId) => fetch(`${BURGER_API_URL}/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({
    'ingredients': ingredientsId,
  })
})
  .then(checkResponse);

export const restorePasswordRequest = ({email}) => fetch(`${BURGER_API_URL}/password-reset`, { //TODO: проверить адрес
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({
    'email': email,
  })
})
.then(checkResponse);

export const resetPasswordRequest = ({password, token}) => fetch(`${BURGER_API_URL}/password-reset/reset`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({
    'password': password,
    'token': token,
  })
})
.then(checkResponse);

export const createUserRequest = ({email, password, name}) => fetch(`${BURGER_API_URL}/auth/register`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({
    'email': email,
    'password': password,
    'name': name,
  })
})
  .then(checkResponse);

export const loginUserRequest = ({email, password}) => fetch(`${BURGER_API_URL}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({
    'email': email,
    'password': password,
  })
})
.then(checkResponse);

export const logoutUserRequest = (token) => fetch(`${BURGER_API_URL}/auth/logout`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({
    'token': token,
  })
})
.then(checkResponse);



export const getUserRequest = () => fetchWithToken(`${BURGER_API_URL}/auth/user`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})
.then(checkResponse);

export const updateUserRequest = ({name, email, password}) => fetchWithToken(`${BURGER_API_URL}/auth/user`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify({
    'name': name,
    'email': email,
    'password': password,
  })
})
.then(checkResponse);
