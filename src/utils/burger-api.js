import { BURGER_API_URL } from './constants';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const getIngredients = () => fetch(`${BURGER_API_URL}/ingredients`)
  .then(checkResponse);

export const getOrderDetails = (ingredientsId) => fetch(`${BURGER_API_URL}/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({
    'ingredients': ingredientsId,
  })
})
  .then(checkResponse);
