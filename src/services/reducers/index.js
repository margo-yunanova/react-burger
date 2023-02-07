import { combineReducers } from "redux";
import { ingredients } from "./ingredients";
import { burgerConstructor } from "./constructor";
import { orderDetails } from "./order-details";
import { currentIngredient } from "./current-ingredient";

const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
  orderDetails,
  currentIngredient,
});

export { rootReducer };
