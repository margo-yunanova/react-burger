import { combineReducers } from "redux";
import { ingredients } from "./ingredients";
import { orderIngredients } from "./constructor";
import { orderDetails } from "./order-details";
import { currentIngredient } from "./current-ingredient";

const rootReducer = combineReducers({
  ingredients,
  orderDetails,
  currentIngredient,
  orderIngredients,
});

export { rootReducer };
