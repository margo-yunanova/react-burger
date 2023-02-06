import { getIngredientsRequest } from "../../utils/burger-api";

export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredients = () => {
  return (dispatch) => {
    getIngredientsRequest()
      .then(response => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: {
            success: response.success,
            ingredients: response.data,
          },
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
};
