import { combineReducers } from "redux";
import { ingredients } from "./ingredients";
import { orderIngredients } from "./constructor";
import { orderDetails } from "./order-details";
import { currentIngredient } from "./current-ingredient";
import { user } from "./user";

const rootReducer = combineReducers({
  ingredients,
  orderDetails,
  currentIngredient,
  orderIngredients,
  user,
});

export { rootReducer };
