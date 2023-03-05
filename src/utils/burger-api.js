import { BURGER_API_URL } from './constants';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

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

export const restorePasswordRequest = (email) => fetch(`${BURGER_API_URL}/password-reset`, { //TODO: проверить адрес
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({
    'email': email,
  })
})
.then(checkResponse);

export const resetPasswordRequest = (password, token) => fetch(`${BURGER_API_URL}/password-reset`, {
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

export const createUserRequest = (email, password, name) => fetch(`${BURGER_API_URL}/auth/register`, {
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

export const loginUserRequest = ({ email, password }) => fetch(`${BURGER_API_URL}/auth/login`, {
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
