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

export const restorePasswordRequest = (email) => fetch(`${BURGER_API_URL}/password-reset`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({
    'email': email,
  })
})
.then(checkResponse);
